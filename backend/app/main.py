from fastapi import FastAPI

from app.routers import free_copy, prices, stores

app = FastAPI(title="BookScout Price Services")

app.include_router(free_copy.router, profile="/free-copy", tags=[free_copy])
app.include_router(prices.router, profile="/prices", tags=[prices])
app.include_router(stores.router, profile="/stores", tags=[stores])

@app.get("/health")
def health():
    return {"status": "ok"}