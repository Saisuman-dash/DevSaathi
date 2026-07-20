# Development Log

## Day 1

Designed complete architecture.

Designed folder structure.

Defined module responsibilities.

Created project structure.

Initialized npm project.

Installed

- Vite
- TypeScript
- Chrome Types

Created

package.json

tsconfig.json

Established documentation structure.

## Day 1 - Checkpoint 2

Completed:

- Created repository documentation structure.
- Added README.md.
- Added LICENSE (MIT).
- Added .gitignore.
- Established development workflow.

Next:

- Configure Chrome Extension manifest.

## Day 1 - Checkpoint 3

Reviewed the initial Manifest V3 configuration.

Validated:

- Manifest Version 3
- Background Service Worker
- Extension Permissions
- Host Permissions

Deferred:

- Content Script Registration
- Icons
- Additional Permissions

## Day 1 - Checkpoint 4

Implemented:

- Initial background Service Worker.

Responsibilities:

- Start with the extension.
- Listen for runtime messages.
- Return acknowledgement.

Current Status:
No business logic.
Acts only as the communication hub.

## Day 1 - Checkpoint 5

Implemented:

- First platform content script.
- Added LeetCode tracker.
- Established content-script to service-worker communication.

Architecture Flow:

LeetCode Page
|
Content Script
|
Runtime Message
|
Service Worker

Current Capability:
Extension can detect platform connection.

Not implemented:

- Problem extraction
- User activity tracking
- Session management

## Checkpoint 5

Implemented a global event system.

Added:

- Event constants
- Shared event interface

Reason:
Every platform should communicate using a common event contract rather than arbitrary message objects.

## Checkpoint 6 – Build Pipeline Simplification

### Decision

Removed Vite and CRXJS from the project.

### Reason

The goal of DevSaathi is to deeply understand Chrome Extension architecture rather than rely on framework abstractions.

The project now uses the native TypeScript compiler (tsc) to generate JavaScript, making the build process transparent and easier to reason about.

### Outcome

- Simpler build pipeline
- Easier debugging
- Better understanding of Manifest V3
- Clear separation between source (src/) and compiled output (dist/)

## Checkpoint 7 – Stable TypeScript Build

### Objective

Establish a stable build pipeline without relying on third-party extension build tools.

### Decisions

- Removed Vite
- Removed CRXJS
- Adopted the native TypeScript compiler (`tsc`)
- Pinned TypeScript to version 5.9

### Outcome

The project now compiles successfully from `src/` to `dist/`, providing a transparent and maintainable build process.

## Checkpoint 8 – First Working Vertical Slice

### Completed

- Extension successfully loads in Chrome
- Service Worker initializes
- LeetCode content script injects correctly
- Runtime messaging between content script and service worker verified

### Outcome

DevSaathi can now observe browser activity and communicate internally using Chrome's messaging system.

## Checkpoint 9 – Problem Page Detection

### Added

- LeetCode problem page detector
- New event: PROBLEM_PAGE_OPENED

### Result

DevSaathi now distinguishes between generic LeetCode pages and actual coding problem pages.

# Day 2 — LeetCode Integration

## Objectives

- Complete Chrome Extension foundation.
- Detect LeetCode problem pages.
- Extract problem metadata.
- Start session tracking.

---

## Completed

- Content Script injection verified.
- Problem page detection implemented.
- LeetCode parser implemented.
- Session Manager integrated.
- Successfully extracting:
  - Title
  - Slug
  - Difficulty

- Event dispatch for `PROBLEM_PAGE_OPENED` implemented.

---

## Major Issue

### Problem

The parser always returned `null`.

### Root Cause

Initially the parser relied on `window.__NEXT_DATA__`.

Inside the Chrome Extension content script, this did not provide the expected page data, causing metadata extraction to fail.

### Solution

Instead of relying on the global object, the parser now reads and parses the JSON contained inside:

`<script id="__NEXT_DATA__">`

This restored reliable metadata extraction.

---

## Current Status

✅ Extension successfully detects LeetCode problems and extracts metadata.

Next:
Connect the extension with the FastAPI backend.

# Day 3 Sprint 1 Progress

## ✅ Session Tracking System Completed

### Features Implemented

- Detect LeetCode problem pages
- Parse problem metadata
  - Title
  - Slug
  - Difficulty
- Start coding session automatically
- Heartbeat every 30 seconds
- Track submissions
- Track number of attempts
- Detect Accepted / Wrong Answer
- Track session duration
- Store completed sessions in SQLite
- Backend analytics endpoints

---

## Backend

Implemented:

- SQLite database
- Session lifecycle manager
- Analytics service
- FastAPI event ingestion

Current session fields:

- Platform
- Problem
- Difficulty
- Start Time
- End Time
- Duration
- Attempts
- Solved Status

---

## APIs

POST /events

GET /analytics/today

GET /analytics/history

---

## Analytics Available

- Problems Solved
- Total Attempts
- Accuracy
- Time Spent
- Difficulty Distribution
- Recent Sessions

---

## Architecture

LeetCode
↓

Content Script
↓

Injected Page Hook
↓

FastAPI Backend
↓

SQLite

---

## Notes

LeetCode submission results are captured using an injected page hook because the site's network requests execute in the page context rather than the extension's isolated content-script context.

---

## Status

Sprint 1 Completed ✅

Next Sprint:

- AI Insights
- Learning Analytics
- Streak System
- Session Recovery
- Dashboard
