from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.routes.auth import router as auth_router
from backend.routes.bookings import router as bookings_router
from backend.routes.rides import router as rides_router

app = FastAPI(title="MorrisGo API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(rides_router)
app.include_router(bookings_router)


@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.get("/items/{item_id}")
def read_item(item_id: int, q:str | None = None):
    return {"item_id" : item_id, "q" : q}

