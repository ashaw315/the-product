/*
 * Dashboard — intentional component hierarchy (Sprint 3, PM-3-6)
 * Strategic order of self-expression:
 * 1. North Star Hero        — DashboardHero (server component)
 * 2. Engagement metrics     — InteractivitySignalLayer (client boundary) wrapping
 *                             the metric tile grid (server components composed here
 *                             in server context, passed as children — valid RSC pattern)
 *                           — VelocityPanel (server component)
 * 3. Quiet State            — QuietStateModule (async server component, via Suspense)
 * 4. Depth                  — DepthIndicator (client component)
 * 5. Orientation            — GuidedOrientationBanner (server component)
 * 6. Metric Detail mount    — MetricDetailDrawer (client component, hidden by default)
 * 7. Reflection link
 */
import { Suspense } from "react";
import Link from "next/link";
import { getAllMetrics, getUser } from "@/lib/product-metrics";
import { DashboardHero } from "./components/DashboardHero";
import { MetricTile } from "./components/MetricTile";
import { VelocityPanel } from "./components/VelocityPanel";
import { InteractivitySignalLayer } from "./components/InteractivitySignalLayer";
import { MetricDetailDrawer } from "./components/MetricDetailDrawer";
import GuidedOrientationBanner from "./components/GuidedOrientationBanner";
import QuietStateModule from "./components/QuietStateModule";
import DepthIndicator from "./components/DepthIndicator";
import styles from "./components/dashboard.module.css";

export const dynamic = "force-dynamic";

const fmt = (n: number) =>
  n >= 1000 ? n.toLocaleString("en-US") : String(n);

const PRIOR_SPRINT_VELOCITY = 0;

export default async function Surface() {
  const user = getUser();
  const m = await getAllMetrics();
  const delta = m.velocity - PRIOR_SPRINT_VELOCITY;

  return (
    <main className="pad">
      <p className="label rise">welcome back, {user.name}</p>

      {/* 1. North Star Hero */}
      <DashboardHero
        northStarValue={m.northStar}
        npsLiftIndex={m.npsLiftIndex}
        featuresShipped={m.featureCount}
      />

      {/* 2. Engagement metrics — InteractivitySignalLayer is a client boundary.
          MetricTile server components are composed here in the server context and
          passed as pre-rendered children — standard RSC composition pattern. */}
      <InteractivitySignalLayer>
        <section
          className={`${styles.tileGrid} rise`}
          aria-label="metric tiles"
          data-testid="tile-grid"
        >
          <MetricTile
            label="North Star"
            value={fmt(m.northStar)}
            descriptor="monotonic"
          />
          <MetricTile
            label="Engagement"
            value={fmt(m.engagement)}
            descriptor="dashboard hits"
          />
          <MetricTile
            label="Velocity"
            value={m.velocity.toFixed(1)}
            descriptor="tickets per sprint"
          />
          <MetricTile
            label="Features Shipped"
            value={fmt(m.featureCount)}
            descriptor="features shipped"
          />
          <MetricTile
            label="Sprints Shipped"
            value={fmt(m.sprintCount)}
            descriptor="sprints shipped"
          />
          <MetricTile
            label="Tests Passing"
            value={`${m.testsPassing}%`}
            descriptor="tests passing"
          />
          <MetricTile
            label="Engagement with the Engagement Dashboard"
            value={fmt(m.engagement)}
            descriptor="hits on this dashboard"
            variant="engagement"
          />
        </section>
      </InteractivitySignalLayer>

      <VelocityPanel currentVelocity={m.velocity} delta={delta} />

      {/* 3. Quiet State — async RSC; Suspense renders null fallback in test environments
          where renderToString cannot await async components. */}
      <Suspense fallback={null}>
        <QuietStateModule />
      </Suspense>

      {/* 4. Depth */}
      <DepthIndicator />

      {/* 5. Orientation */}
      <GuidedOrientationBanner />

      {/* 6. Metric Detail Drawer — client boundary, hidden by default */}
      <MetricDetailDrawer isOpen={false} />

      {/* 7. Reflection link */}
      <Link href="/reflection" className="label">
        {"Read the product's reflection."}
      </Link>
    </main>
  );
}
