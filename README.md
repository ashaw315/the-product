# the product

The public, content-free SaaS application that documents itself. Its only
subject is the product. This repo is the **mutable surface** built by the
agent; the **spine** (`app/(spine)/`, `lib/`, `db/`) is hand-authored and
protected.

## Run Sprint 0

```bash
npm install
cp .env.example .env.local        # add your Neon DATABASE_URL
psql "$DATABASE_URL" -f db/schema.sql
psql "$DATABASE_URL" -f db/seed-sprint-0.sql
npm run dev
```

You'll see the engagement dashboard (about itself) at `/`, and the spine at
`/changelog`, `/roadmap`, `/org`, `/status`, `/specs/0`. With only Sprint 0
seeded, the spine shows its empty states — the product, nonetheless, exists.

## What's protected

The builder agent receives this repo and opens PRs against the **surface**
(`app/page.tsx`, `app/components/`, `app/<features>/`, `tests/`). It must never
modify the spine. Three guards enforce this:

1. The builder brief forbids editing `app/(spine)/`, `lib/`, `db/`, `ci/`.
2. `.github/CODEOWNERS` locks those paths.
3. `npm run guard` (run in CI) fails any PR whose diff reaches them.

## The keystone

`lib/product-metrics.ts` defines the self-referential metrics. Some are real
(sprint count, feature count, velocity), some circular (engagement), some
fabricated (NPS lift index). `getNorthStar()` is monotonic by construction — it
cannot go down.

## Note: engagement

`getEngagement()` reads the `hits` table. Recording a hit (a write) is the one
sanctioned product side-effect and is intentionally **not** wired on render —
add it via a client beacon or route handler. It's a natural early sprint ticket:
"the engagement dashboard should track engagement with the engagement dashboard."
# the-product
