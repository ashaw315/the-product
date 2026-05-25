import Link from "next/link";
import { getEngagement, getAllMetrics } from "@/lib/product-metrics";

export const dynamic = "force-dynamic";

const fmt = (n: number) =>
  n >= 1000 ? n.toLocaleString("en-US") : String(n);

export default async function EngagementPage() {
  const [engagement, allMetrics] = await Promise.all([
    getEngagement(),
    getAllMetrics(),
  ]);

  return (
    <main className="pad">
      <p className="label">Engagement with the Engagement Dashboard</p>
      <p
        className="mono declarative"
        data-testid="engagement-hero-value"
      >
        {fmt(engagement)}
      </p>
      <p className="prose" data-testid="engagement-description">
        Engagement measures the degree to which the product is engaged with. The
        engagement coefficient reflects engagement as a function of itself.
      </p>
      <section aria-label="engagement context">
        <p className="label">Engagement Coefficient</p>
        <p className="mono" data-testid="engagement-coefficient">
          {allMetrics.engagement.toFixed(2)}
        </p>
      </section>
      <Link href="/" className="label" data-testid="back-to-dashboard">
        ← back to dashboard
      </Link>
    </main>
  );
}
