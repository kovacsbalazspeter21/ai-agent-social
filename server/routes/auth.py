from fastapi import APIRouter, Request
from fastapi.responses import RedirectResponse, JSONResponse

router = APIRouter()

@router.get("/auth/{platform}/login")
async def social_login(platform: str):
    # Itt csak demo URL-t adunk vissza, valós OAuth-hoz cseréld ki!
    if platform == "facebook":
        url = "https://www.facebook.com/v19.0/dialog/oauth?client_id=FAKE_FB_ID&redirect_uri=http://localhost:8000/auth/facebook/callback"
    elif platform == "x":
        url = "https://twitter.com/i/oauth2/authorize?client_id=FAKE_X_ID&redirect_uri=http://localhost:8000/auth/x/callback"
    elif platform == "linkedin":
        url = "https://www.linkedin.com/oauth/v2/authorization?client_id=FAKE_LI_ID&redirect_uri=http://localhost:8000/auth/linkedin/callback"
    elif platform == "instagram":
        url = "https://www.facebook.com/v19.0/dialog/oauth?client_id=FAKE_FB_ID&redirect_uri=http://localhost:8000/auth/facebook/callback"
    elif platform == "threads":
        url = "https://www.facebook.com/v19.0/dialog/oauth?client_id=FAKE_FB_ID&redirect_uri=http://localhost:8000/auth/facebook/callback"
    else:
        return JSONResponse({"error": "Ismeretlen platform"}, status_code=400)
    return RedirectResponse(url)

@router.get("/auth/{platform}/callback")
async def social_callback(platform: str, request: Request):
    # Itt dolgozd fel a callbacket, majd irányítsd vissza a frontendre
    frontend_url = f"http://localhost:3000/generate?platform={platform}"
    return RedirectResponse(frontend_url)