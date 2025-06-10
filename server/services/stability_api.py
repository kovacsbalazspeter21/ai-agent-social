import os
import httpx

STABILITY_API_KEY = os.getenv("STABILITY_API_KEY")

async def generate_image(prompt: str, width: int = 512, height: int = 512):
    """
    Kép generálása a Stability AI API-val (Stable Diffusion).
    """
    url = "https://api.stability.ai/v2beta/stable-image/generate/sd3"
    headers = {
        "Authorization": f"Bearer {STABILITY_API_KEY}",
        "Content-Type": "application/json"
    }
    payload = {
        "prompt": prompt,
        "output_format": "png",
        "width": width,
        "height": height
    }
    async with httpx.AsyncClient() as client:
        response = await client.post(url, headers=headers, json=payload, timeout=60)
        response.raise_for_status()
        data = response.json()
        # A válaszban lehet egy kép URL vagy base64 string, ezt igazítsd a Stability API dokumentációjához!
        image_url = data.get("image_url") or data.get("result", "")
        return image_url

async def generate_video(prompt: str):
    """
    Videó generálása a Stability AI API-val (példa).
    """
    url = "https://api.stability.ai/v2beta/video/generate"
    headers = {
        "Authorization": f"Bearer {STABILITY_API_KEY}",
        "Content-Type": "application/json"
    }
    payload = {
        "prompt": prompt,
        "output_format": "mp4"
    }
    async with httpx.AsyncClient() as client:
        response = await client.post(url, headers=headers, json=payload, timeout=120)
        response.raise_for_status()
        data = response.json()
        video_url = data.get("video_url") or data.get("result", "")
        return video_url
    