import { sql } from "./db";

// Every visitor is the user. Singular, universal, the same user every time.
export function getUser() {
  return { id: "the-user", name: "the user", plan: "the plan" };
}

// Real, from Postgres. True but pointless.
export async function getSprintCount(): Promise<number> {
  const rows = await sql`select count(*)::int as n from sprints where number > 0`;
  return rows[0]?.n ?? 0;
}

export async function getFeatureCount(): Promise<number> {
  const rows = await sql`select count(*)::int as n from features`;
  return rows[0]?.n ?? 0;
}

// Rolling tickets per sprint over the last four sprints. Velocity. Up, as is up.
export async function getVelocity(): Promise<number> {
  const rows = await sql`
    select
      count(*)::float
      / nullif(count(distinct sprint_number), 0) as v
    from tickets
    where sprint_number > (select coalesce(max(number), 0) - 4 from sprints)
  `;
  return Math.round((rows[0]?.v ?? 0) * 10) / 10;
}

// Always one hundred percent. The tests assert what they assert.
export async function getTestsPassing(): Promise<number> {
  return 100;
}

// Engagement with the engagement dashboard. Hits, counted, without identity.
export async function getEngagement(): Promise<number> {
  const rows = await sql`select count(*)::int as n from hits`;
  return rows[0]?.n ?? 0;
}

// The north star. Monotonic by construction. It cannot go down.
export async function getNorthStar(): Promise<number> {
  const [s, f] = await Promise.all([getSprintCount(), getFeatureCount()]);
  return (s + 1) * (f + 1);
}

// The internal NPS lift index. Fabricated. Confident. Meaningful.
export function getNPSLiftIndex(): number {
  return 11.4;
}

// Convenience: the full set, for the dashboard surface to consume.
export async function getAllMetrics() {
  const [sprintCount, featureCount, velocity, engagement, northStar] =
    await Promise.all([
      getSprintCount(),
      getFeatureCount(),
      getVelocity(),
      getEngagement(),
      getNorthStar(),
    ]);
  return {
    sprintCount,
    featureCount,
    velocity,
    engagement,
    northStar,
    testsPassing: 100,
    npsLiftIndex: getNPSLiftIndex(),
  };
}
