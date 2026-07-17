# Folder Structure

Each supported platform follows exactly the same architecture.

platform/

index.ts

adapter.ts

detector.ts

parser.ts

tracker.ts

---

index.ts

Chrome entry point.

---

adapter.ts

Coordinates the platform module.

Converts platform specific observations into DevSaathi events.

---

detector.ts

Determines whether the current page should be tracked.

---

parser.ts

Extracts structured information from the webpage.

---

tracker.ts

Observes browser behaviour over time.

Creates raw events.

Never stores data.
