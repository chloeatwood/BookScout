import os
import time
 
import httpx
 
EBAY_CLIENT_ID = os.environ["EBAY_CLIENT_ID"]
EBAY_CLIENT_SECRET = os.environ["EBAY_CLIENT_SECRET"]
 
TOKEN_URL = "https://api.ebay.com/identity/v1/oauth2/token"
SEARCH_URL = "https://api.ebay.com/buy/browse/v1/item_summary/search"
 
_token_cache: dict = {"access_token": None, "expires_at": 0}
 
 
async def _get_access_token() -> str:
    if (
        _token_cache["access_token"]
        and _token_cache["expires_at"] > time.time() + 30
    ):
        return _token_cache["access_token"]
 
    async with httpx.AsyncClient() as client:
        response = await client.post(
            TOKEN_URL,
            data={
                "grant_type": "client_credentials",
                "scope": "https://api.ebay.com/oauth/api_scope",
            },
            auth=(EBAY_CLIENT_ID, EBAY_CLIENT_SECRET),
            headers={
                "Content-Type": "application/x-www-form-urlencoded"
            },
        )
        response.raise_for_status()
        data = response.json()
 
    _token_cache["access_token"] = data["access_token"]
    _token_cache["expires_at"] = time.time() + data["expires_in"]
 
    return data["access_token"]
 
 
async def search_book_listings(query: str, limit: int = 10) -> list[dict]:
    """
    Search eBay listings for a book by title/author/ISBN text query.
    Returns a normalized list of {title, price, currency, url, condition}.
    """
    token = await _get_access_token()
 
    async with httpx.AsyncClient() as client:
        response = await client.get(
            SEARCH_URL,
            params={
                "q": query,
                "category_ids": "267",  # Books category
                "limit": limit,
                "sort": "price",
            },
            headers={
                "Authorization": f"Bearer {token}",
                "X-EBAY-C-MARKETPLACE-ID": "EBAY_US",
            },
        )
        response.raise_for_status()
        data = response.json()
 
    listings = []
 
    for item in data.get("itemSummaries", []):
        price = item.get("price", {})
        listings.append(
            {
                "title": item.get("title"),
                "price": price.get("value"),
                "currency": price.get("currency"),
                "url": item.get("itemWebUrl"),
                "condition": item.get("condition"),
            }
        )
 
    return listings