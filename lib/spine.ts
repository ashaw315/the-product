import { sql } from "./db";

// /changelog — every release note, newest first.
export async function getReleaseNotes() {
  return sql`
    select number, release_notes, created_at
    from sprints
    where number > 0 and release_notes is not null
    order by number desc
  `;
}

// /roadmap — everything we have ever said we would do. Nothing is ever done.
export async function getRoadmap() {
  return sql`
    select
      number,
      prd->>'title' as title,
      prd->>'vision_statement' as vision
    from sprints
    where number > 0
    order by number desc
  `;
}

// /org — the gallery of PMs of record. The current sprint's PM is active.
// Everyone before them is former. Where they went is not recorded.
export async function getPMs() {
  return sql`
    with latest as (select coalesce(max(number), 0) as n from sprints)
    select
      pm_name as name,
      min(pm_title) as first_title,
      (array_agg(pm_title order by number desc))[1] as latest_title,
      min(pm_bio) as bio,
      min(number) as first_sprint,
      max(number) as last_sprint,
      case
        when max(number) = (select n from latest) then 'active'
        else 'former'
      end as status
    from sprints
    where number > 0 and pm_name is not null
    group by pm_name
    order by max(number) desc
  `;
}

// /specs and /specs/[sprint]
export async function getSprintList() {
  return sql`
    select number, prd->>'title' as title, pm_name
    from sprints
    where number > 0
    order by number desc
  `;
}

export async function getSpec(n: number) {
  const rows = await sql`select * from sprints where number = ${n}`;
  if (!rows[0]) return null;
  const tickets = await sql`
    select id, title, description, acceptance_criteria, priority, estimate
    from tickets where sprint_number = ${n} order by id
  `;
  return { ...rows[0], tickets };
}

// /status — the documentary list of green tests, newest first.
export async function getTestNames() {
  return sql`
    select sprint_number, name
    from tests
    where passing = true
    order by id desc
    limit 1000
  `;
}

// /research — the user's own words over time, oldest first so the arc reads
// top to bottom: curiosity giving way, slowly, to fatigue.
export async function getResearch() {
  return sql`
    select number, user_research, created_at
    from sprints
    where number > 0 and user_research is not null
    order by number asc
  `;
}
