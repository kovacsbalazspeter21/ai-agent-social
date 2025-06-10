import os
from fastapi import APIRouter, Request
from fastapi.responses import RedirectResponse, JSONResponse

router = APIRouter()

@router.get("/auth/{platform}/login")
async def social_login(platform: str):
    # OAuth paraméterek .env-ből
    FACEBOOK_APP_ID = os.getenv("FACEBOOK_APP_ID")
    INSTAGRAM_APP_ID = os.getenv("INSTAGRAM_APP_ID")
    THREADS_APP_ID = os.getenv("THREADS_APP_ID")
    TWITTER_CLIENT_ID = os.getenv("TWITTER_CLIENT_ID")
    LINKEDIN_CLIENT_ID = os.getenv("LINKEDIN_CLIENT_ID")

    redirect_base = "http://localhost:8000/auth"
    url = None

    if platform == "facebook":
        url = (
            f"https://www.facebook.com/v19.0/dialog/oauth"
            f"?client_id={FACEBOOK_APP_ID}"
            f"&redirect_uri={redirect_base}/facebook/callback"
            f"&scope=public_profile,email,pages_manage_posts,pages_read_engagement"
            f"&response_type=code"
        )
    elif platform == "instagram":
        url = (
            f"https://www.facebook.com/v19.0/dialog/oauth"
            f"?client_id={INSTAGRAM_APP_ID}"
            f"&redirect_uri={redirect_base}/instagram/callback"
            f"&scope=instagram_basic,instagram_content_publish"
            f"&response_type=code"
        )
    elif platform == "threads":
        url = (
            f"https://www.facebook.com/v19.0/dialog/oauth"
            f"?client_id={THREADS_APP_ID}"
            f"&redirect_uri={redirect_base}/threads/callback"
            f"&scope=public_profile"
            f"&response_type=code"
        )
    elif platform == "x":
        url = (
            f"https://twitter.com/i/oauth2/authorize"
            f"?client_id={TWITTER_CLIENT_ID}"
            f"&redirect_uri={redirect_base}/x/callback"
            f"&response_type=code"
            f"&scope=tweet.read%20tweet.write%20users.read%20offline.access"
            f"&state=random"
            f"&code_challenge=challenge"
            f"&code_challenge_method=plain"
        )
    elif platform == "linkedin":
        url = (
            f"https://www.linkedin.com/oauth/v2/authorization"
            f"?response_type=code"
            f"&client_id={LINKEDIN_CLIENT_ID}"
            f"&redirect_uri={redirect_base}/linkedin/callback"
            f"&scope=r_liteprofile%20r_emailaddress%20w_member_social"
            f"&state=random"
        )
    else:
        return JSONResponse({"error": "Ismeretlen platform"}, status_code=400)
    return RedirectResponse(url)

@router.get("/auth/{platform}/callback")
async def social_callback(platform: str, request: Request):
    # Itt dolgozd fel a callbacket, majd irányítsd vissza a frontendre
    frontend_url = f"http://localhost:3000/generate?platform={platform}"
    return RedirectResponse(frontend_url)