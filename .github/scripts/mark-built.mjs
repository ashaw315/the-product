// Marks a sprint as built (PR opened) so the builder won't pick it up again.
// Runs only after the build step succeeds.
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);
const number = Number(process.argv[2]);

if (!Number.isInteger(number)) {
  console.error("Usage: node mark-built.mjs <sprint-number>");
  process.exit(1);
}

await sql`update sprints set built_at = now() where number = ${number}`;
console.log(`Marked sprint ${number} built.`);
