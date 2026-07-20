from app.database.db import get_connection

active_sessions = {}


def initialize_database():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS sessions(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        platform TEXT,
        title TEXT,
        slug TEXT,
        difficulty TEXT,
        start_time INTEGER,
        end_time INTEGER,
        duration INTEGER,
        solved INTEGER DEFAULT 0,
        attempts INTEGER DEFAULT 0
    )
    """)

    conn.commit()
    conn.close()


def start_session(event):

    slug = event.problem.slug

    active_sessions[slug] = {
        "platform": event.platform,
        "title": event.problem.title,
        "difficulty": event.problem.difficulty,
        "start_time": event.timestamp,
        "last_seen": event.timestamp,
        "attempts": 0,
        "solved": False,
    }

    print(f"🟢 Session Started : {slug}")


def heartbeat(event):

    slug = event.problem.slug

    session = active_sessions.get(slug)

    if not session:
        return

    session["last_seen"] = event.timestamp

    print(f"💓 Heartbeat : {slug}")


def submission_result(event):

    slug = event.problem.slug

    session = active_sessions.get(slug)

    if not session:
        return

    session["attempts"] += 1

    if event.result == "Accepted":
        session["solved"] = True

    print(f"📤 Submission : {event.result} | Attempts : {session['attempts']}")


def save_session(session, event, duration):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
    INSERT INTO sessions(
        platform,
        title,
        slug,
        difficulty,
        start_time,
        end_time,
        duration,
        solved,
        attempts
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        session["platform"],
        session["title"],
        event.problem.slug,
        session["difficulty"],
        session["start_time"],
        event.timestamp,
        duration,
        int(session["solved"]),
        session["attempts"]
    ))

    conn.commit()
    conn.close()


def end_session(event):

    slug = event.problem.slug

    session = active_sessions.get(slug)

    if not session:
        return

    duration = event.timestamp - session["start_time"]

    save_session(session, event, duration)

    del active_sessions[slug]

    print(f"🔴 Session Ended : {slug}")
    print(f"⏱ Duration : {duration / 1000:.1f} sec")


def save_event(event):

    print(f"[{event.type}] {event.problem.slug}")

    if event.type == "PROBLEM_PAGE_OPENED":
        start_session(event)

    elif event.type == "HEARTBEAT":
        heartbeat(event)

    elif event.type == "SUBMISSION_RESULT":
        submission_result(event)

    elif event.type == "SESSION_ENDED":
        end_session(event)


def get_today_stats():

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
    SELECT
        COUNT(*),
        COALESCE(SUM(duration),0),
        COALESCE(SUM(solved),0),
        COALESCE(SUM(attempts),0)
    FROM sessions
    """)

    total, total_time, solved, attempts = cursor.fetchone()

    cursor.execute("""
    SELECT difficulty, COUNT(*)
    FROM sessions
    GROUP BY difficulty
    """)

    diff = {
        "Easy": 0,
        "Medium": 0,
        "Hard": 0
    }

    for d, c in cursor.fetchall():
        diff[d] = c

    conn.close()

    accuracy = round((solved / attempts) * 100) if attempts else 0

    return {
        "problems": total,
        "time": total_time,
        "easy": diff["Easy"],
        "medium": diff["Medium"],
        "hard": diff["Hard"],
        "solved": solved,
        "attempts": attempts,
        "accuracy": accuracy
    }


def get_recent_sessions():

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
    SELECT
        title,
        difficulty,
        duration,
        platform,
        solved,
        attempts
    FROM sessions
    ORDER BY id DESC
    LIMIT 10
    """)

    rows = cursor.fetchall()

    conn.close()

    return [
        {
            "title": row[0],
            "difficulty": row[1],
            "duration": row[2],
            "platform": row[3],
            "solved": bool(row[4]),
            "attempts": row[5],
        }
        for row in rows
    ]