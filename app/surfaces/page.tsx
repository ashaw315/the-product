import Link from "next/link";
import { getAllMetrics } from "@/lib/product-metrics";

export const dynamic = "force-dynamic";

export default async function SurfacesPage() {
  const metrics = await getAllMetrics();

  return (
    <main className="pad">
      <h1 className="heading">Navigable Surface Index</h1>
      <p className="label">all surfaces, enumerated</p>

      <ul data-testid="surface-list">
        <li>
          <Link href="/" data-testid="surface-link-home">
            dashboard
          </Link>
        </li>
        <li>
          <a href="/presence" data-testid="surface-link-presence">
            return depth view
          </a>
        </li>
        <li>
          <a href="/surfaces" data-testid="surface-link-surfaces">
            surface index
          </a>
        </li>
      </ul>

      <p>
        <span className="mono" data-testid="surfaces-feature-count">
          {metrics.featureCount}
        </span>{" "}
        features across{" "}
        <span className="mono" data-testid="surfaces-sprint-count">
          {metrics.sprintCount}
        </span>{" "}
        sprints. every surface is intentional.
      </p>
    </main>
  );
}
