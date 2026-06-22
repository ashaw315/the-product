import { getAllMetrics, getSprintCount } from "@/lib/product-metrics";
import { MetricAccumulationTimeline } from "../components/MetricAccumulationTimeline";

export const dynamic = "force-dynamic";

export default async function PresencePage() {
  const [metrics, sprintCount] = await Promise.all([
    getAllMetrics(),
    getSprintCount(),
  ]);

  return (
    <main className="pad">
      <h1 className="heading">Return Depth View</h1>
      <p className="label">
        presence across{" "}
        <span className="mono" data-testid="presence-sprint-count">
          {sprintCount}
        </span>{" "}
        sprints
      </p>

      <section aria-label="sprint layers" data-testid="sprint-layers">
        {Array.from({ length: sprintCount }, (_, i) => i + 1).map((sprint) => (
          <div key={sprint} data-testid="sprint-layer">
            <p className="label">sprint {sprint}</p>
            <p>
              north star:{" "}
              <span className="mono">{metrics.northStar}</span>
              {" · "}
              features:{" "}
              <span className="mono">{metrics.featureCount}</span>
              {" · "}
              velocity:{" "}
              <span className="mono">{metrics.velocity.toFixed(1)}</span>
              {" · "}
              engagement:{" "}
              <span className="mono">{metrics.engagement}</span>
            </p>
          </div>
        ))}
      </section>

      <MetricAccumulationTimeline metrics={metrics} />
    </main>
  );
}
