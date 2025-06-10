import os
import requests

# X (Twitter) posztolás v2 API-hoz
def post_to_x(text: str, media_ids=None, bearer_token: str = None):
    """
    Posztolás X-re (Twitterre) v2 API-val.
    :param text: A poszt szövege
    :param media_ids: Lista media_id-kről (opcionális, képek/videók)
    :param bearer_token: OAuth2 Bearer token (ha nincs megadva, .env-ből olvassa)
    :return: API válasz (dict)
    """
    if bearer_token is None:
        bearer_token = os.getenv("TWITTER_BEARER_TOKEN")
    url = "https://api.twitter.com/2/tweets"
    headers = {
        "Authorization": f"Bearer {bearer_token}",
        "Content-Type": "application/json"
    }
    payload = {"text": text}
    if media_ids:
        payload["media"] = {"media_ids": media_ids}
    response = requests.post(url, headers=headers, json=payload)
    return response.json()