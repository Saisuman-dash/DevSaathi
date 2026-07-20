from fastapi import APIRouter
from app.schemas.event import Event
from app.services.tracker_service import save_event
from app.services.tracker_service import (
    get_today_stats,
    get_recent_sessions
)

router = APIRouter()


@router.post("/events")
def receive_event(event: Event):

    save_event(event)

    return {
        "status": "saved"
    }

@router.get("/analytics/today")
def today():
    return get_today_stats()


@router.get("/analytics/history")
def history():
    return get_recent_sessions()