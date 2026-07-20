from fastapi import FastAPI
from app.api.events import router as events_router
from app.api.analytics import router as analytics_router
from fastapi.middleware.cors import CORSMiddleware
from app.services.tracker_service import initialize_database

app = FastAPI(title="DevSaathi Backend")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Development only
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

initialize_database()
app.include_router(events_router)
app.include_router(analytics_router)


@app.get("/")
def root():
    return {
        "message": "DevSaathi Backend Running"
    }