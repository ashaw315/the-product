import Link from "next/link";
import { getAllMetrics } from "@/lib/product-metrics";

export const dynamic = "force-dynamic";

export default async function WayfindingMosaic() {
  const m = await getAllMetrics();

  return (
    <main className="pad">
      <h1 className="heading" data-testid="wayfinding-heading">Wayfinding</h1>
      <p className="prose" style={{ marginTop: "1.5rem", marginBottom: "2rem" }}>
        The product has traveled through {m.sprintCount} sprints and accumulated {m.featureCount} features. The north star is {m.northStar}. This is where you are.
      </p>

      <nav aria-label="wayfinding navigation">
        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <li><Link href="/" className="label">Return to the dashboard</Link></li>
          <li><Link href="/arrival" className="label">See what showed up</Link></li>
          <li><Link href="/evolution" className="label">See the evolution</Link></li>
        </ul>
      </nav>
    </main>
  );
}
