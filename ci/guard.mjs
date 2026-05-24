#!/usr/bin/env node
// The spine is scripture. The builder may write the surface; it may not touch
// app/(spine)/ or lib/. This guard fails CI if a diff reaches them.
import { execSync } from "node:child_process";

const PROTECTED = [/^app\/\(spine\)\//, /^lib\//, /^db\//, /^ci\//, /^\.github\//, /^app\/globals\.css$/, /^app\/layout\.tsx$/];

const base = process.env.GITHUB_BASE_REF || "main";

let changed = "";
try {
  execSync(`git fetch origin ${base} --depth=1`, { stdio: "ignore" });
  changed = execSync(`git diff --name-only origin/${base}...HEAD`, {
    encoding: "utf8",
  });
} catch {
  // local fallback: compare against main
  changed = execSync(`git diff --name-only main...HEAD`, { encoding: "utf8" });
}

const files = changed.split("\n").map((f) => f.trim()).filter(Boolean);
const violations = files.filter((f) => PROTECTED.some((p) => p.test(f)));

if (violations.length) {
  console.error("Protected paths were modified. The spine is not editable:");
  for (const v of violations) console.error("  " + v);
  process.exit(1);
}

console.log("Spine intact. " + files.length + " files changed, none protected.");
