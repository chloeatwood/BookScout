from fastapi import APIRouter, Query
from app.services import ebay

router = APIRouter()


@router.get("/search")
async def search_prices(
    q: str = Query(..., description="Book title, author, or ISBN"),
    limit: int = 10,
):

    listings = await ebay.search_book_listings(q, limit=limit)

    return {
        "query": q,
        "count": len(listings),
        "listings": listings,
    }