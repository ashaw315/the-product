-- the-product / the-org shared schema (Neon Postgres)
-- the org writes; the product reads. the spine renders from these tables.

-- one row per weekly sprint. sprint 0 is hand-seeded and never written by the agent.
create table if not exists sprints (
  number          integer primary key,
  pm_name         text,
  pm_title        text,
  pm_bio          text,
  prd             jsonb,        -- {title, vision_statement, problem_statement, proposed_solution, success_metrics[], non_goals[]}
  standup_notes   text,
  release_notes   text,         -- release notes authored for the PREVIOUS sprint
  user_research   text,         -- the user's own words about the product this sprint
  created_at      timestamptz not null default now()
);

-- one row per ticket. tickets are the source of truth the builder implements.
create table if not exists tickets (
  id                  text primary key,   -- PM-XXX
  sprint_number       integer not null references sprints(number),
  title               text not null,
  description         text,
  acceptance_criteria jsonb,              -- string[]
  priority            text,               -- P0 | P1 | P2
  estimate            text                -- S | M | L
);

-- the accumulating manifest. features are never deleted, only deprecated.
create table if not exists features (
  id              serial primary key,
  name            text not null,
  sprint_number   integer not null references sprints(number),
  status          text not null default 'shipped',  -- shipped | deprecated
  created_at      timestamptz not null default now()
);

-- anonymous engagement. no identity. everyone is the user.
create table if not exists hits (
  id              serial primary key,
  path            text not null,
  created_at      timestamptz not null default now()
);

-- the documentary record. every passing test name, kept forever.
create table if not exists tests (
  id              serial primary key,
  sprint_number   integer not null references sprints(number),
  name            text not null,
  passing         boolean not null default true
);

-- the evolution archive. one row per page captured per sprint.
create table if not exists captures (
  id              serial primary key,
  sprint_number   integer not null,
  page            text not null,        -- route, e.g. '/', '/changelog'
  image_url       text not null,
  captured_at     timestamptz not null default now()
);
