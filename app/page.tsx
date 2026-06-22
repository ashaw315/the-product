/*
 * Dashboard Component Inventory — Sprint 6 Audit (PM-6-6)
 *
 * ABOVE FOLD
 * ----------
 * 1. Welcome label (inline) — personalized greeting via getUser()
 * 2. DashboardHero — north star value, NPS lift index, features shipped hero numbers
 * 3. MetricTile grid — all metric primitives; includes engagement-with-engagement variant
 *
 * BELOW FOLD
 * ----------
 * 4.  VelocityPanel — sprint-over-sprint momentum with directional indicator (↑/→/↓)
 * 5.  GuidedOrientationBanner — orientation context for new and returning users; ships
 *       with a quieted variant (data-quieted="true") that renders a minimal sprint label
 * 6.  MetricDetailDrawer — full metric breakdown in a collapsible <details> element
 * 7.  InteractivitySignalLayer — live engagement event count; signals the product is active
 * 8.  ReturnBeacon — presence marker for the returning user; anchors sprint continuity
 * 9.  AnticipationLayer — velocity-based prompt anticipating the next sprint accumulation
 * 10. QuietStateModule — minimal "the product is present" marker; structural floor component
 * 11. DepthIndicator — feature count × sprint count depth display
 * 12. ProductCompletenessSignal — completeness signal across features, tests, and sprints
 * 13. DiscoveryRibbon — navigation ribbon to all surfaces: /, /surfaces, /presence
 *       (refactored Sprint 6 to add /presence link per PM-6-3)
 * 14. AmbientOrientationSignal — async; derives orientation prompt from featureCount and
 *       velocity; rendered via Suspense so SSR fallback is null if not yet resolved
 *       (added Sprint 6, PM-6-2)
 *
 * Sprint 6 changes: AmbientOrientationSignal added at position 14 (PM-6-2);
 * DiscoveryRibbon refactored to include /presence link (PM-6-3);
 * this audit comment added (PM-6-6). No components removed.
 */

import { Suspense } from "react";
import { getAllMetrics, getUser } from "@/lib/product-metrics";
import { DashboardHero } from "./components/DashboardHero";
import { MetricTile } from "./components/MetricTile";
import { VelocityPanel } from "./components/VelocityPanel";
import { GuidedOrientationBanner } from "./components/GuidedOrientationBanner";
import { MetricDetailDrawer } from "./components/MetricDetailDrawer";
import { InteractivitySignalLayer } from "./components/InteractivitySignalLayer";
import { ReturnBeacon } from "./components/ReturnBeacon";
import { AnticipationLayer } from "./components/AnticipationLayer";
import { QuietStateModule } from "./components/QuietStateModule";
import { DepthIndicator } from "./components/DepthIndicator";
import { ProductCompletenessSignal } from "./components/ProductCompletenessSignal";
import { DiscoveryRibbon } from "./components/DiscoveryRibbon";
import { AmbientOrientationSignal } from "./components/AmbientOrientationSignal";
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
      {/* above fold */}
      <p className="label rise">welcome back, {user.name}</p>

      <DashboardHero
        northStarValue={m.northStar}
        npsLiftIndex={m.npsLiftIndex}
        featuresShipped={m.featureCount}
      />

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

      {/* below fold */}
      <VelocityPanel currentVelocity={m.velocity} delta={delta} />

      <GuidedOrientationBanner
        sprintCount={m.sprintCount}
        featureCount={m.featureCount}
      />

      <MetricDetailDrawer metrics={m} />

      <InteractivitySignalLayer engagement={m.engagement} />

      <ReturnBeacon sprintCount={m.sprintCount} />

      <AnticipationLayer velocity={m.velocity} />

      <QuietStateModule />

      <DepthIndicator
        featureCount={m.featureCount}
        sprintCount={m.sprintCount}
      />

      <ProductCompletenessSignal
        featureCount={m.featureCount}
        testsPassing={m.testsPassing}
        sprintCount={m.sprintCount}
      />

      <DiscoveryRibbon />

      <Suspense fallback={null}>
        <AmbientOrientationSignal />
      </Suspense>
    </main>
  );
}
