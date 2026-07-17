# Event System

Everything inside DevSaathi communicates using events.

---

What is an Event?

A fact that happened.

Examples

PROBLEM_OPENED

PROBLEM_SOLVED

VIDEO_STARTED

VIDEO_PAUSED

CHATGPT_OPENED

CHATGPT_HINT_USED

---

Event Flow

Tracker

↓

Adapter

↓

Service Worker

↓

Session Manager

↓

Storage

↓

Publisher

---

Why Events?

Loose coupling.

Platform independence.

Easy scalability.

Simple debugging.
