from fastapi import APIRouter, Query
from app.services import free_copy

router = APIRouter()

@router.get("/check")
async def check_free_copy(q: str = Query(..., description="Book title, author, or ISBN"),):
    result = await free_copy.find_free_copy(q)
    
    return {
        "query": q,
        "found": result is not None,
        "result": result,
    }