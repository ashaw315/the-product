import Link from "next/link";
import { getAllMetrics } from "@/lib/product-metrics";

export const dynamic = "force-dynamic";

export default async function OrientationModule() {
  const m = await getAllMetrics();

  return (
    <main className="pad">
      <p className="label">orientation</p>
      <h1 className="heading" style={{ marginTop: "0.5rem", marginBottom: "1.5rem" }}>
        Sprint 7 Orientation
      </h1>
      <p className="prose" style={{ marginBottom: "2rem" }}>
        North star:{" "}
        <span className="mono" data-testid="north-star-value">
          {m.northStar}
        </span>
        {" "}— Sprint{" "}
        <span className="mono" data-testid="sprint-count-value">
          {m.sprintCount}
        </span>
        {" "}— Velocity:{" "}
        <span className="mono" data-testid="velocity-value">
          {m.velocity.toFixed(1)}
        </span>
        .
      </p>
      <nav aria-label="product surfaces" data-testid="surfaces-nav">
        <p className="label" style={{ marginBottom: "0.75rem" }}>Product Surfaces</p>
        <ul
          data-testid="surfaces-list"
          style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <li>
            <Link href="/engagement" data-testid="link-engagement">
              <span className="heading" style={{ fontSize: "1rem" }}>Engagement</span>
              <br />
              <span className="label">Where the product measures itself.</span>
            </Link>
          </li>
          <li>
            <Link href="/presence" data-testid="link-presence">
              <span className="heading" style={{ fontSize: "1rem" }}>Presence</span>
              <br />
              <span className="label">Where the product accounts for its own return depth.</span>
            </Link>
          </li>
          <li>
            <Link href="/surfaces" data-testid="link-surfaces">
              <span className="heading" style={{ fontSize: "1rem" }}>Surfaces</span>
              <br />
              <span className="label">Where the product indexes its own navigable area.</span>
            </Link>
          </li>
          <li>
            <Link href="/reflection" data-testid="link-reflection">
              <span className="heading" style={{ fontSize: "1rem" }}>Reflection</span>
              <br />
              <span className="label">Where the product considers what has accumulated.</span>
            </Link>
          </li>
        </ul>
      </nav>
    </main>
  );
}
