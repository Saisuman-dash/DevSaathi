## Lesson 001

Chrome extensions cannot execute TypeScript directly.

Reason:

Chrome only understands JavaScript.

Therefore, TypeScript must be compiled before loading the extension.

---

## Lesson 002

The Service Worker should contain orchestration logic, not platform-specific business logic.

Reason:

Platform logic belongs inside content scripts.

## Lesson 003 – Prefer Stable Tooling for Learning Projects

When learning a new technology, prefer stable and widely adopted tool versions unless the project specifically requires the latest release.

Reason:
Using cutting-edge versions can introduce unrelated compatibility issues that distract from learning the core concepts.

Decision:
DevSaathi will use TypeScript 5.x as the baseline compiler.

## Lesson 004 – Build Simplicity Before Build Automation

A project should first have a simple and understandable build pipeline before introducing additional tooling.

Reason:

Understanding how the build works makes debugging significantly easier and prevents over-reliance on frameworks.

## Lesson 005 – Build Vertical Slices

Rather than implementing many unfinished features, first build a complete end-to-end flow.

A working vertical slice provides confidence that the architecture is correct before adding complexity.
