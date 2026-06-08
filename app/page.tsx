// Dashboard component stacking order (top → bottom)
// --- Above fold ---
// 1. ReturnBeacon              — present-tense continuity prose (engagement + sprint count)
// 2. DashboardHero             — north star hero with NPS lift index and features shipped
// 3. GuidedOrientationBanner   — orientation/navigation banner (full or quieted state)
// --- Below fold ---
// 4. MetricTileGrid            — 7 metric tiles (north star, engagement, velocity, features, sprints, tests, recursive engagement)
// 5. VelocityPanel             — sprint-over-sprint velocity momentum indicator
// 6. QuietStateModule          — ambient engagement state
// 7. DepthIndicator            — sprint depth indicator
// 8. AnticipationLayer         — forward-facing accumulation statement (velocity + feature count)

import { getAllMetrics, getUser } from "@/lib/product-metrics";
import { DashboardHero } from "./components/DashboardHero";
import { MetricTile } from "./components/MetricTile";
import { VelocityPanel } from "./components/VelocityPanel";
import { ReturnBeacon } from "./components/ReturnBeacon";
import { AnticipationLayer } from "./components/AnticipationLayer";
import {
  GuidedOrientationBanner,
  QUIETED_THRESHOLD,
} from "./components/GuidedOrientationBanner";
import { QuietStateModule } from "./components/QuietStateModule";
import { DepthIndicator } from "./components/DepthIndicator";
import styles from "./components/dashboard.module.css";

export const dynamic = "force-dynamic";

const fmt = (n: number) =>
  n >= 1000 ? n.toLocaleString("en-US") : String(n);

const PRIOR_SPRINT_VELOCITY = 0;

export default async function Surface() {
  const user = getUser();
  const m = await getAllMetrics();
  const delta = m.velocity - PRIOR_SPRINT_VELOCITY;

  const returnBeaconNode = await ReturnBeacon();
  const anticipationLayerNode = await AnticipationLayer();
  const quietStateModuleNode = await QuietStateModule();
  const depthIndicatorNode = await DepthIndicator();

  return (
    <main className="pad">
      <p className="label rise">welcome back, {user.name}</p>

      {returnBeaconNode}

      <DashboardHero
        northStarValue={m.northStar}
        npsLiftIndex={m.npsLiftIndex}
        featuresShipped={m.featureCount}
      />

      <GuidedOrientationBanner isQuieted={m.engagement <= QUIETED_THRESHOLD} />

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

      <VelocityPanel currentVelocity={m.velocity} delta={delta} />

      {quietStateModuleNode}

      {depthIndicatorNode}

      {anticipationLayerNode}
    </main>
  );
}
