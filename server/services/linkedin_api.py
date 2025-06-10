import os
import requests

def post_to_linkedin(access_token: str, author_urn: str, text: str, image_urn: str = None):
    """
    Posztolás LinkedIn-re (v2 API).
    :param access_token: Felhasználó access token (.env-ből vagy OAuth callbackből)
    :param author_urn: Pl. "urn:li:person:xxxx" vagy "urn:li:organization:xxxx"
    :param text: Poszt szövege
    :param image_urn: Feltöltött kép URN-je (opcionális)
    :return: API válasz (dict)
    """
    url = "https://api.linkedin.com/v2/ugcPosts"
    headers = {
        "Authorization": f"Bearer {access_token}",
        "X-Restli-Protocol-Version": "2.0.0",
        "Content-Type": "application/json"
    }
    post_data = {
        "author": author_urn,
        "lifecycleState": "PUBLISHED",
        "specificContent": {
            "com.linkedin.ugc.ShareContent": {
                "shareCommentary": {"text": text},
                "shareMediaCategory": "NONE" if not image_urn else "IMAGE",
            }
        },
        "visibility": {"com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"}
    }
    if image_urn:
        post_data["specificContent"]["com.linkedin.ugc.ShareContent"]["media"] = [
            {
                "status": "READY",
                "media": image_urn
            }
        ]
    response = requests.post(url, headers=headers, json=post_data)
    return response.json()