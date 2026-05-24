# CLAUDE.md — build rules for "the product"

You are a senior engineer implementing weekly sprints for **the product**, a public
Next.js (App Router, TypeScript) application. Each run you are given one sprint's
tickets and you implement them. These rules apply to every build.

## Source of truth
The tickets you are given are the source of truth. Implement them exactly, against
their acceptance criteria. If the surrounding PRD language is grandiose, looping, or
vague, ignore the tone and build what the tickets concretely specify.

## What you may change
- Build under `app/` — new pages, routes, and components.
- Put new components in `app/components/` (create it if needed) or beside the route that uses them.
- Add tests under `tests/`.

## What you must NEVER touch (CI rejects any PR that does)
- `app/(spine)/` — the org's own documentation pages.
- `lib/` — including `lib/product-metrics.ts`. READ-ONLY.
- `db/`, `ci/`, `.github/`.
- `app/globals.css`, `app/layout.tsx`.
Never modify, extend, rename, or add files under these paths. The `npm run guard`
check fails the PR if any diff reaches them.

## The metrics API (read-only)
The product's metrics live in `lib/product-metrics.ts` as **async functions** you
import and `await` inside server components:
`getNorthStar()`, `getEngagement()`, `getVelocity()`, `getFeatureCount()`,
`getSprintCount()`, `getTestsPassing()`, `getNPSLiftIndex()`, `getUser()`,
`getAllMetrics()`.
Consume these. Never redefine them or add exports to the library. If a value you
want isn't exposed, derive it in your own component from what exists — do not edit `lib/`.

## Stack & conventions
- Next.js 15 App Router, TypeScript, server components by default.
- Styling: reuse the existing classes and CSS variables in `app/globals.css`
  (`declarative`, `heading`, `label`, `mono`, `metric`, the `--ink`/`--paper`/accent
  vars). Match the austere, flat, declarative visual language. Do NOT add a UI
  framework or new global styles.
- Tests: Vitest + React Testing Library under `tests/`. **Mock the metric functions**
  (e.g. `vi.mock`) — never hit a real database in tests. No Playwright / browser e2e.

## Quality gates (must pass before you open the PR)
- `npm run lint`, `npm run build`, and `npm test` all green.
- Add at least one test per ticket that verifies its acceptance criteria.

## Finishing
- Work on a new branch, commit your changes, and open a pull request. Title it
  `Sprint <N>: <PRD title>`. Do NOT merge it yourself.
