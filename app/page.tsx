/*
 * Dashboard component order — Sprint 8:
 * 1. DashboardHero            — Sprint 1
 * 2. ReturnAcknowledgmentSignal — Sprint 8
 * 3. ContinuitySignalBanner   — Sprint 7
 * 4. Metric tile grid         — Sprint 1
 * 5. VelocityPanel            — Sprint 1
 * 6. DiscoveryRibbon          — Sprint 5
 * 7. DepthIndicator           — Sprint 6
 * 8. QuietStateModule         — Sprint 6
 * 9. AnticipationLayer        — Sprint 7
 * 10. AmbientOrientationSignal — Sprint 7
 */
import {
  getNorthStar,
  getEngagement,
  getVelocity,
  getFeatureCount,
  getSprintCount,
  getTestsPassing,
  getNPSLiftIndex,
  getUser,
} from "@/lib/product-metrics";
import { DashboardHero } from "./components/DashboardHero";
import { MetricTile } from "./components/MetricTile";
import { VelocityPanel } from "./components/VelocityPanel";
import { ReturnAcknowledgmentSignal } from "./components/ReturnAcknowledgmentSignal";
import { ContinuitySignalBanner } from "./components/ContinuitySignalBanner";
import { DiscoveryRibbon } from "./components/DiscoveryRibbon";
import { DepthIndicator } from "./components/DepthIndicator";
import { QuietStateModule } from "./components/QuietStateModule";
import { AnticipationLayer } from "./components/AnticipationLayer";
import { AmbientOrientationSignal } from "./components/AmbientOrientationSignal";
import styles from "./components/dashboard.module.css";

export const dynamic = "force-dynamic";

const fmt = (n: number) =>
  n >= 1000 ? n.toLocaleString("en-US") : String(n);

const PRIOR_SPRINT_VELOCITY = 0;

export default async function Surface() {
  const [northStar, engagement, velocity, featureCount, sprintCount, testsPassing] =
    await Promise.all([
      getNorthStar(),
      getEngagement(),
      getVelocity(),
      getFeatureCount(),
      getSprintCount(),
      getTestsPassing(),
    ]);
  const npsLiftIndex = getNPSLiftIndex();
  const user = getUser();
  const delta = velocity - PRIOR_SPRINT_VELOCITY;

  return (
    <main className="pad">
      <p className="label rise">welcome back, {user.name}</p>

      <DashboardHero
        northStarValue={northStar}
        npsLiftIndex={npsLiftIndex}
        featuresShipped={featureCount}
      />

      <ReturnAcknowledgmentSignal
        sprintCount={sprintCount}
        featureCount={featureCount}
      />

      <ContinuitySignalBanner sprintCount={sprintCount} />

      <section
        className={`${styles.tileGrid} rise`}
        aria-label="metric tiles"
        data-testid="tile-grid"
      >
        <MetricTile
          label="North Star"
          value={fmt(northStar)}
          descriptor="monotonic"
        />
        <MetricTile
          label="Engagement"
          value={fmt(engagement)}
          descriptor="dashboard hits"
        />
        <MetricTile
          label="Velocity"
          value={velocity.toFixed(1)}
          descriptor="tickets per sprint"
        />
        <MetricTile
          label="Features Shipped"
          value={fmt(featureCount)}
          descriptor="features shipped"
        />
        <MetricTile
          label="Sprints Shipped"
          value={fmt(sprintCount)}
          descriptor="sprints shipped"
        />
        <MetricTile
          label="Tests Passing"
          value={`${testsPassing}%`}
          descriptor="tests passing"
        />
        <MetricTile
          label="Engagement with the Engagement Dashboard"
          value={fmt(engagement)}
          descriptor="hits on this dashboard"
          variant="engagement"
        />
      </section>

      <VelocityPanel currentVelocity={velocity} delta={delta} />

      <DiscoveryRibbon />
      <DepthIndicator />
      <QuietStateModule />
      <AnticipationLayer />
      <AmbientOrientationSignal />
    </main>
  );
}
