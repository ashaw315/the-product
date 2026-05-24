// Finds the oldest unbuilt sprint in Neon and assembles the builder prompt.
// Writes two GitHub Action outputs: `sprint` (the number, or "" if none) and
// `prompt` (the multi-line instruction the agent will follow). Run in the
// the-product builder workflow, which has @neondatabase/serverless installed.
import { neon } from "@neondatabase/serverless";
import { appendFileSync } from "node:fs";

const sql = neon(process.env.DATABASE_URL);
const OUT = process.env.GITHUB_OUTPUT;

function setOutput(key, value) {
  appendFileSync(OUT, `${key}=${value}\n`);
}
function setMultiline(key, value) {
  const delim = "EOF_" + Math.random().toString(36).slice(2);
  appendFileSync(OUT, `${key}<<${delim}\n${value}\n${delim}\n`);
}

// Oldest sprint that has been written but not yet built. number > 0 skips the
// seed/void row. Build sequentially so history accumulates in order.
const sprints = await sql`
  select number, pm_name, prd
  from sprints
  where number > 0 and built_at is null
  order by number asc
  limit 1
`;

if (!sprints.length) {
  setOutput("sprint", "");
  console.log("No unbuilt sprint. Nothing to do.");
  process.exit(0);
}

const s = sprints[0];
const prd = typeof s.prd === "string" ? JSON.parse(s.prd) : s.prd;

const tickets = await sql`
  select id, title, description, acceptance_criteria, priority, estimate
  from tickets
  where sprint_number = ${s.number}
  order by id asc
`;

const title = prd?.title || `Sprint ${s.number}`;

let prompt = `You are implementing Sprint ${s.number} of "the product". Follow ALL rules in CLAUDE.md at the repository root.\n\n`;
prompt += `PRD: ${title}\n`;
if (prd?.vision_statement) prompt += `Vision: ${prd.vision_statement}\n`;
prompt += `\nImplement the following tickets exactly. The tickets are the source of truth — build what they specify, not what the vision language gestures at.\n\n`;

for (const t of tickets) {
  const ac = Array.isArray(t.acceptance_criteria)
    ? t.acceptance_criteria
    : typeof t.acceptance_criteria === "string"
      ? JSON.parse(t.acceptance_criteria || "[]")
      : [];
  prompt += `### ${t.id}: ${t.title}  [${t.priority || "P?"} · ${t.estimate || "?"}]\n`;
  prompt += `${t.description || ""}\n`;
  if (ac.length) {
    prompt += `Acceptance criteria:\n` + ac.map((a) => `- ${a}`).join("\n") + `\n`;
  }
  prompt += `\n`;
}

prompt += `When finished:\n`;
prompt += `1. Ensure \`npm run lint\`, \`npm run build\`, and \`npm test\` all pass.\n`;
prompt += `2. Create a branch named \`sprint-${s.number}-build\`, commit, and open a pull request titled "Sprint ${s.number}: ${title}".\n`;
prompt += `3. Do NOT touch any protected path (see CLAUDE.md) and do NOT merge the PR.\n`;

setOutput("sprint", String(s.number));
setMultiline("prompt", prompt);
console.log(`Prepared build for sprint ${s.number} — ${tickets.length} tickets (${title}).`);
