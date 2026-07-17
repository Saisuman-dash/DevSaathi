# DevSaathi Architecture

Version: 0.1

---

# Vision

DevSaathi is an AI-powered learning companion that automatically observes a developer's browser-based learning activities, reconstructs learning sessions, generates insights, and publishes structured learning updates to GitHub.

The objective is to eliminate manual documentation while helping developers build a public learning portfolio.

---

# Core Philosophy

The browser extension should never directly generate GitHub posts, summaries or analytics.

Instead, every platform simply observes user activity and emits standardized events.

Everything else reacts to those events.

This makes the architecture scalable, modular and maintainable.

---

# High Level Architecture

Browser

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

Publisher

↓

GitHub

---

# Principles

- Event Driven Architecture
- Single Responsibility Principle
- High Cohesion
- Low Coupling
- Platform Independent Analytics
- Modular Design

---

# Supported Platforms (Planned)

- LeetCode
- YouTube
- ChatGPT
- GitHub
- Codeforces
- GeeksforGeeks
- W3Schools

---

Current Sprint

Sprint 1

Goal:

Detect opening of a LeetCode problem and successfully create a learning session.
