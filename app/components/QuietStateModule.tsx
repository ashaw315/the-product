import { getAllMetrics } from "@/lib/product-metrics";

export default async function QuietStateModule() {
  const m = await getAllMetrics();

  if (!m.northStar || !m.sprintCount || !m.velocity) {
    return null;
  }

  return (
    <section aria-label="quiet state" data-testid="quiet-state-module">
      <p className="prose">
        The product has completed {m.sprintCount} sprints. Velocity is{" "}
        {m.velocity}. The north star holds at {m.northStar}.
      </p>
    </section>
  );
}
