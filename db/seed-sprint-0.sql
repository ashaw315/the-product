-- Sprint 0. The void before the work.
-- Authored by hand, once. The agent never writes this row.
-- Sprint 1 will open by quoting this vision statement.

insert into sprints (number, pm_name, pm_title, pm_bio, prd, standup_notes, release_notes)
values (
  0,
  null,
  null,
  null,
  jsonb_build_object(
    'title', 'the product',
    'vision_statement', 'we are the product organization of the product, which exists',
    'problem_statement', null,
    'proposed_solution', null,
    'success_metrics', jsonb_build_array(),
    'non_goals', jsonb_build_array()
  ),
  null,
  null
)
on conflict (number) do nothing;
