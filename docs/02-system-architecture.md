# System Architecture

Chrome

↓

Content Scripts

↓

Platform Adapter

↓

Service Worker

↓

Session Manager

↓

Storage

↓

Analytics

↓

Publisher

↓

GitHub

---

## Responsibilities

Content Script

Observe browser activity.

Never calculate analytics.

Never store data.

Never publish.

---

Service Worker

Receive events.

Coordinate modules.

Route messages.

---

Session Manager

Maintain learning sessions.

Calculate active time.

Calculate pause duration.

Handle session lifecycle.

---

Storage

Persist sessions.

Persist events.

Persist settings.

---

Publisher

Convert sessions into GitHub content.

Publish automatically.

### Current Responsibilities (Sprint 1)

- Receive runtime events.
- Log incoming messages.
- Acknowledge senders.

### Future Responsibilities

- Route events to SessionManager.
- Coordinate Storage.
- Trigger Publisher.
- Schedule background tasks.

## Content Scripts

Content scripts are platform-specific agents.

Responsibilities:

- Run inside supported websites.
- Detect user activity.
- Extract platform events.
- Send normalized events to Service Worker.

Current Platforms:

- LeetCode (initial)
