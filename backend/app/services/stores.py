import os
from fastapi import APIRouter, Query
import httpx

GOOGLE_PLACES_API_KEY = os.environ["GOOGLE_PLACES_API_KEY"]
NEARBY_SEARCH_URL = (
    "https://places.googleapis.com/v1/places:searchNearby"
)

router = APIRouter()


@router.get("/nearby")
async def nearby_bookstores(
    lat: float = Query(...),
    lng: float = Query(...),
    radius_meters: int = 8000,
):
    """
    Returns nearby bookstores as plain locations (name, address,
    rating). No pricing data is available from this source -- see
    the README for why.
    """
    async with httpx.AsyncClient() as client:
        response = await client.post(
            NEARBY_SEARCH_URL,
            json={
                "includedTypes": ["book_store"],
                "maxResultCount": 15,
                "locationRestriction": {
                    "circle": {
                        "center": {
                            "latitude": lat,
                            "longitude": lng,
                        },
                        "radius": radius_meters,
                    }
                },
            },
            headers={
                "X-Goog-Api-Key": GOOGLE_PLACES_API_KEY,
                "X-Goog-FieldMask": (
                    "places.displayName,places.formattedAddress,"
                    "places.rating,places.location"
                ),
            },
        )
        response.raise_for_status()
        data = response.json()

    stores = [
        {
            "name": place.get("displayName", {}).get("text"),
            "address": place.get("formattedAddress"),
            "rating": place.get("rating"),
            "location": place.get("location"),
        }
        for place in data.get("places", [])
    ]

    return {"count": len(stores), "stores": stores}