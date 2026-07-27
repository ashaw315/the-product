import Link from "next/link";
import { getNorthStar, getSprintCount } from "@/lib/product-metrics";

export async function HabitAcknowledgmentComponent() {
  const northStarValue = await getNorthStar();
  const sprintCount = await getSprintCount();

  return (
    <section
      aria-label="habit acknowledgment"
      data-testid="habit-acknowledgment"
      style={{ marginTop: "2.5rem", paddingTop: "2rem", borderTop: "1.5px solid var(--ink)" }}
    >
      <p className="prose" style={{ marginBottom: "1.25rem" }}>
        You have been here before. The product has been here too — through {sprintCount} sprints, holding a north star of {northStarValue}. Returning is part of what makes this what it is.
      </p>
      <Link href="/arrival" className="label" style={{ textDecoration: "underline", textUnderlineOffset: "3px" }}>
        See what showed up.
      </Link>
    </section>
  );
}

export default HabitAcknowledgmentComponent;
