from fastapi import APIRouter
from app.database.db import get_connection
from app.services.tracker_service import (
    get_today_stats,
    get_recent_sessions,
)

router = APIRouter()


@router.get("/analytics/today")
def today():
    return get_today_stats()


@router.get("/analytics/history")
def history():
    return get_recent_sessions()

@router.get("/sessions")
def sessions():
    conn=get_connection()

    cursor=conn.cursor()

    cursor.execute("""
    SELECT
    title,
    difficulty,
    duration,
    datetime(start_time/1000,'unixepoch','localtime')
    FROM sessions
    ORDER BY start_time DESC
    LIMIT 15
    """)

    rows=cursor.fetchall()

    conn.close()

    return rows