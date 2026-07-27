import Link from "next/link";
import { getSprintCount } from "@/lib/product-metrics";

export async function ClickabilitySignal() {
  const sprintCount = await getSprintCount();

  return (
    <section
      aria-label="clickability signal"
      data-testid="clickability-signal"
      style={{ marginTop: "2.5rem" }}
    >
      <p className="heading" style={{ marginBottom: "0.5rem" }}>
        {sprintCount} sprints. Still going.
      </p>
      <Link href="/roadmap" className="heading" style={{ display: "inline-block", background: "var(--ink)", color: "var(--paper)", padding: "0.6rem 1.25rem" }}>
        See where this is going →
      </Link>
    </section>
  );
}

export default ClickabilitySignal;
