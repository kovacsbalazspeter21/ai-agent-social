import requests

# Facebook oldalra posztolás
def post_to_facebook(page_id: str, access_token: str, message: str, image_url: str = None):
    """
    Posztolás Facebook oldalra.
    :param page_id: Facebook oldal ID
    :param access_token: Oldal access token (.env-ből olvasd ki a route-ban)
    :param message: Poszt szövege
    :param image_url: Opcionális kép URL
    :return: API válasz (dict)
    """
    url = f"https://graph.facebook.com/v19.0/{page_id}/feed"
    payload = {
        "message": message,
        "access_token": access_token
    }
    if image_url:
        payload["picture"] = image_url
    response = requests.post(url, data=payload)
    return response.json()

# Instagramra posztolás (kép)
def post_to_instagram(ig_user_id: str, access_token: str, image_url: str, caption: str):
    """
    Posztolás Instagramra (Meta Graph API).
    :param ig_user_id: Instagram business user ID
    :param access_token: Instagram access token (.env-ből olvasd ki a route-ban)
    :param image_url: Kép URL
    :param caption: Poszt szövege
    :return: API válasz (dict)
    """
    # 1. Kép feltöltése
    media_url = f"https://graph.facebook.com/v19.0/{ig_user_id}/media"
    media_payload = {
        "image_url": image_url,
        "caption": caption,
        "access_token": access_token
    }
    media_resp = requests.post(media_url, data=media_payload).json()
    creation_id = media_resp.get("id")
    if not creation_id:
        return media_resp

    # 2. Publikálás
    publish_url = f"https://graph.facebook.com/v19.0/{ig_user_id}/media_publish"
    publish_payload = {
        "creation_id": creation_id,
        "access_token": access_token
    }
    publish_resp = requests.post(publish_url, data=publish_payload).json()
    return publish_resp