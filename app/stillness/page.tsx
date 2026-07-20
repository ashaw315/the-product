import { getEngagement, getNorthStar } from "@/lib/product-metrics";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function StillnessSurface() {
  const [engagement, northStar] = await Promise.all([
    getEngagement(),
    getNorthStar(),
  ]);

  return (
    <main className="pad">
      <p className="label">stillness surface</p>
      <h1 className="heading">/stillness</h1>
      <p className="declarative">
        The product is still. The metrics are not.
      </p>
      <section aria-label="stillness metrics" data-testid="stillness-metrics">
        <div>
          <span className="label">Engagement </span>
          <span className="metric" data-testid="engagement-value">{engagement}</span>
        </div>
        <div>
          <span className="label">North Star </span>
          <span className="metric" data-testid="north-star-value">{northStar}</span>
        </div>
      </section>
      <nav aria-label="surface navigation" data-testid="surface-nav">
        <Link href="/">Return to dashboard</Link>
      </nav>
    </main>
  );
}
