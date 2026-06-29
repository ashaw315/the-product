import { getSprintCount, getNorthStar } from "@/lib/product-metrics";

export default async function ContinuitySignalBanner() {
  const sprintCount = await getSprintCount();
  const northStar = await getNorthStar();

  return (
    <section
      aria-label="continuity signal"
      data-testid="continuity-signal-banner"
      style={{ borderBottom: "1.5px solid var(--ink)", paddingBottom: "1.5rem", marginBottom: "1.5rem" }}
    >
      <p className="declarative">
        <span data-testid="sprint-count-value">{sprintCount}</span>
        {" "}sprint{sprintCount !== 1 ? "s" : ""}.{" "}
        North star at{" "}
        <span data-testid="north-star-value">{northStar}</span>.
        Something is happening.
      </p>
    </section>
  );
}
