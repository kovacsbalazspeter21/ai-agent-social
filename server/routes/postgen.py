from fastapi import APIRouter, Form
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
import os
import json
import httpx
import openai
from fastapi import UploadFile, File
from dotenv import load_dotenv
from services.meta_api import post_to_facebook, post_to_instagram
from services.stability_api import generate_image, generate_video
from service.x_api import post_to_x
from service.linkedin_api import post_to_linkedin


load_dotenv()
router = APIRouter()

STORAGE_DIR = os.path.join(os.path.dirname(__file__), "..", "storage")
os.makedirs(STORAGE_DIR, exist_ok=True)

class PostGenRequest(BaseModel):
    platform: str
    prompt: str

class Post(BaseModel):
    id: int
    platform: str
    prompt: str
    content: str
    files: Optional[List[str]] = []
    links: Optional[List[str]] = []
    images: Optional[List[str]] = []   # ÚJ: generált képek URL-jei
    videos: Optional[List[str]] = []   # ÚJ: generált videók URL-jei (ha lesz ilyen)
    scheduled_time: Optional[str] = None
    created_at: str

openai.api_key = os.getenv("OPENAI_API_KEY")

@router.post("/generate-post")
async def generate_post(data: PostGenRequest):
    prompts = [
        f"Készíts egy bemutató posztot erről: {data.prompt}",
        f"Ird le a legerősebb vagy legkülönlegesebb {data.prompt} modellt egy posztban!",
        f"Ossz meg egy friss hírt vagy érdekességet a {data.prompt}-ról egy posztban!"
    ]
    results = []
    for p in prompts:
        # ÚJ OpenAI API hívás
        chat_response = openai.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": f"Készíts egy {data.platform} posztot magyarul!"},
                {"role": "user", "content": p}
            ],
            max_tokens=120,
            n=1,
        )
        text = chat_response.choices[0].message.content.strip()
        img_response = openai.images.generate(
            model="dall-e-2",
            prompt=p,
            n=1,
            size="512x512"
        )
        image_url = img_response.data[0].url
        results.append({
            "text": text,
            "image": image_url
        })
    return {"options": results}

# ÚJ: AI kép generálás végpont (OpenAI DALL-E)
@router.post("/generate-image")
async def generate_image(prompt: str = Form(...)):
    # OpenAI DALL-E API hívás (API kulcsot .env-ből olvass ki!)
    openai.api_key = os.getenv("OPENAI_API_KEY")
    response = openai.Image.create(
        prompt=prompt,
        n=1,
        size="512x512"
    )
    image_url = response['data'][0]['url']
    return {"image_url": image_url}

# (Videó generálás hasonló, de ehhez más AI API kell, pl. Stability vagy Replicate.)

STABILITY_API_KEY = os.getenv("STABILITY_API_KEY")

@router.post("/generate-video")
async def generate_video(prompt: str = Form(...)):
    # Stability API hívás (példa, a pontos endpointot és paramétereket a Stability docs alapján állítsd be!)
    headers = {
        "Authorization": f"Bearer {STABILITY_API_KEY}",
        "Content-Type": "application/json"
    }
    payload = {
        "prompt": prompt,
        "output_format": "mp4"
    }
    async with httpx.AsyncClient() as client:
        response = await client.post(
            "https://api.stability.ai/v2beta/video/generate",
            headers=headers,
            json=payload,
            timeout=120
        )
        response.raise_for_status()
        data = response.json()
        # Példa: a válaszban lehet egy videó URL vagy base64, ezt igazítsd a Stability API-hoz!
        video_url = data.get("video_url") or data.get("result", "")
        return {"video_url": video_url}

UPLOADS_DIR = os.path.join(os.path.dirname(__file__), "..", "uploads")
os.makedirs(UPLOADS_DIR, exist_ok=True)

@router.post("/upload-file")
async def upload_file(file: UploadFile = File(...)):
    file_path = os.path.join(UPLOADS_DIR, file.filename)
    with open(file_path, "wb") as f:
        content = await file.read()
        f.write(content)
    # A frontendnek visszaadjuk az elérési utat vagy URL-t
    return {"filename": file.filename, "url": f"/uploads/{file.filename}"}

@router.post("/create-post")
async def create_post(
    platform: str = Form(...),
    prompt: str = Form(...),
    content: str = Form(...),
    files: Optional[str] = Form("[]"),
    links: Optional[str] = Form("[]"),
    images: Optional[str] = Form("[]"),   # ÚJ: képek URL-jei
    videos: Optional[str] = Form("[]"),   # ÚJ: videók URL-jei
    scheduled_time: Optional[str] = Form(None)
):
    files_list = json.loads(files)
    links_list = json.loads(links)
    images_list = json.loads(images)
    videos_list = json.loads(videos)
    created_at = datetime.now().isoformat()
    post_id = int(datetime.now().timestamp() * 1000)
    post = Post(
        id=post_id,
        platform=platform,
        prompt=prompt,
        content=content,
        files=files_list,
        links=links_list,
        images=images_list,
        videos=videos_list,
        scheduled_time=scheduled_time,
        created_at=created_at
    )
    filename = os.path.join(STORAGE_DIR, f"post_{post_id}.json")
    with open(filename, "w", encoding="utf-8") as f:
        json.dump(post.dict(), f, ensure_ascii=False, indent=2)
    return {"success": True, "post": post}

@router.get("/posts")
async def get_posts():
    posts = []
    for fname in os.listdir(STORAGE_DIR):
        if fname.endswith(".json"):
            with open(os.path.join(STORAGE_DIR, fname), encoding="utf-8") as f:
                posts.append(json.load(f))
    return posts

# Példa route Facebook poszthoz
@router.post("/post-facebook")
async def post_facebook_route(data: dict):
    page_id = data.get("page_id")
    access_token = data.get("access_token")
    message = data.get("message")
    image_url = data.get("image_url")
    resp = post_to_facebook(page_id, access_token, message, image_url)
    return resp

# Példa route Instagram poszthoz
@router.post("/post-instagram")
async def post_instagram_route(data: dict):
    ig_user_id = data.get("ig_user_id")
    access_token = data.get("access_token")
    image_url = data.get("image_url")
    caption = data.get("caption")
    resp = post_to_instagram(ig_user_id, access_token, image_url, caption)
    return resp

@router.post("/post-x")
async def post_x_route(data: dict):
    access_token = data.get("access_token")
    message = data.get("message")
    image_url = data.get("image_url")
    resp = post_to_x(access_token, message, image_url)
    return resp

@router.post("/post-linkedin")
async def post_linkedin_route(data: dict):
    access_token = data.get("access_token")
    message = data.get("message")
    image_url = data.get("image_url")
    resp = post_to_linkedin(access_token, message, image_url)
    return resp

