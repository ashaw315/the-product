/*
 * Dashboard — the Surface
 *
 * Above-the-fold: Welcome label, DepthAcknowledgmentBanner (Sprint 9),
 *   ReturnAcknowledgmentSignal (Sprint 8), DashboardHero.
 * Below-the-fold: Metric tile grid, VelocityPanel, ContinuitySignalBanner
 *   (Sprint 8), LatentEngagementIndicator (Sprint 9).
 *
 * All metric values are retrieved via getAllMetrics() and passed as props to
 * child components. PRIOR_SPRINT_VELOCITY anchors the sprint-over-sprint
 * velocity delta displayed in VelocityPanel.
 */

// lib
import { getAllMetrics, getUser } from "@/lib/product-metrics";

// components
import { DashboardHero } from "./components/DashboardHero";
import { MetricTile } from "./components/MetricTile";
import { VelocityPanel } from "./components/VelocityPanel";
import { ReturnAcknowledgmentSignal } from "./components/ReturnAcknowledgmentSignal";
import { ContinuitySignalBanner } from "./components/ContinuitySignalBanner";
import { DepthAcknowledgmentBanner } from "./components/DepthAcknowledgmentBanner";
import { LatentEngagementIndicator } from "./components/LatentEngagementIndicator";
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
      {/* ── above-the-fold ─────────────────────────────────────────── */}
      <section aria-label="above-the-fold">
        <p className="label rise">welcome back, {user.name}</p>
        <DepthAcknowledgmentBanner
          northStar={m.northStar}
          sprintCount={m.sprintCount}
        />
        <ReturnAcknowledgmentSignal northStar={m.northStar} />
        <DashboardHero
          northStarValue={m.northStar}
          npsLiftIndex={m.npsLiftIndex}
          featuresShipped={m.featureCount}
        />
      </section>

      {/* ── below-the-fold ─────────────────────────────────────────── */}
      <section aria-label="below-the-fold">
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
        <ContinuitySignalBanner
          velocity={m.velocity}
          sprintCount={m.sprintCount}
        />
        <LatentEngagementIndicator
          engagement={m.engagement}
          northStar={m.northStar}
        />
      </section>
    </main>
  );
}
