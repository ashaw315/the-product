import { getEngagement, getSprintCount, getNorthStar } from "@/lib/product-metrics";

export const dynamic = "force-dynamic";

export default async function ReturnSignalAccumulator() {
  const [engagement, sprintCount, northStar] = await Promise.all([
    getEngagement(),
    getSprintCount(),
    getNorthStar(),
  ]);

  return (
    <main className="pad">
      <p className="label">return signal accumulator</p>
      <h1 className="heading">/returns</h1>
      <p className="declarative">
        Every return is a signal. This surface accumulates them.
      </p>
      <section aria-label="return metrics" data-testid="return-metrics">
        <div data-testid="engagement-value-row">
          <span className="label">Engagement </span>
          <span className="metric" data-testid="engagement-value">{engagement}</span>
        </div>
        <div data-testid="sprint-count-row">
          <span className="label">Sprints </span>
          <span className="metric" data-testid="sprint-count-value">{sprintCount}</span>
        </div>
        <div data-testid="north-star-row">
          <span className="label">North Star </span>
          <span className="metric" data-testid="north-star-value">{northStar}</span>
        </div>
      </section>
    </main>
  );
}
