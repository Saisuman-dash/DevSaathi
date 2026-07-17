# Architecture Decision Records

---

ADR-001

Decision

One content script per platform.

Reason

High Cohesion.

Status

Accepted.

---

ADR-002

Decision

Event Driven Architecture.

Reason

Scalable.

Platform independent.

Status

Accepted.

---

ADR-003

Decision

Service Worker acts as Orchestrator.

Reason

Business logic remains inside dedicated modules.

Status

Accepted.

---

ADR-004

Decision

Session timing calculated by Session Manager.

Reason

Trackers only observe.

Status

Accepted.

---

ADR-005

Decision

Popup built using Vanilla HTML/CSS/TypeScript.

Reason

Focus on architecture rather than UI framework.

Status

Accepted.

ADR-006

Decision

Follow the Principle of Least Privilege for Chrome permissions.

Reason

The extension should request only the permissions required for the current sprint.
Additional permissions will be introduced incrementally as features are implemented.

Status

Accepted.

ADR-008

Decision

Use Vite as the primary build tool with TypeScript acting only as a type checker.

Reason

Vite provides modern module bundling, asset handling, and optimized builds while TypeScript focuses on static type checking. This separates responsibilities and keeps the build pipeline scalable.

Alternatives Considered

- Plain TypeScript Compiler (tsc)
  Rejected because it would require additional tooling for bundling and asset management as the project grows.

Status

Accepted.
