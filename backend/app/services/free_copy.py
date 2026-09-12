import httpx

GUTENDEX_URL = "https://gutendex.com/books"
OPEN_LIBRARY_SEARCH_URL = "https://openlibrary.org/search.json"

async def check_gutenberg(query: str) -> dict | None:
    async with httpx.AsyncClient() as client:
        response = await client.get(
            GUTENDEX_URL, params={"search": query}
        )
        
        response.raise_for_status()
        data = response.json()
        
    results = data.get("results", [])
    
    if not results:
        return None
    
    book = results[0]
    formats = book.get("formats", {})
    
    read_url = (
        formats.get("text/html") 
        or formats.get("text/plain; charset=utf-8")
        or formats.get("text/plain") 
        or next(iter(formats.values()), None)
    )
    
    if not read_url:
        return None
    
    return {
        "source": "project_gutenberg",
        "title": book.get("title"),
        "url": read_url,
        "access": "public_domain",
    }
    
async def check_open_library(query: str) -> dict | None:
    async with httpx.AsyncClient() as client:
        response = await client.get(
            OPEN_LIBRARY_SEARCH_URL,
            params={
                "q": query,
                "fields": "title,key,ebook_access,ia",
                "limit": 1,
            },
        )
        
        response.raise_for_status()
        data = response.json()
        
    docs = data.get("docs", [])
    
    if not data:
        return None
    
    doc = docs[0]
    access = doc.get("ebook_access")
    
    # public_domain = freely readable
    # borrowable = free with a free account
    if access not in ("public_domain", "borrowable"):
        return None
    
    is_ids = doc.get("ia") or []
    read_url = (
        f"https://archive.org/details/{ia_ids[0]}"
        if ia_ids
        else f"https://openlibrary.org{doc.get('key', '')}"
    )
    
    return {
        "source": "open_library",
        "title": doc.get("title"),
        "url": read_url,
        "access": access,
    }
    
async def find_free_copy(query: str) -> dict| None:
    gutenbery_results = await check_gutenberg(query)
    
    if gutenbery_results:
        return gutenbery_results
    
    return await check_open_library(query)