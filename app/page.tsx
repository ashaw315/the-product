import { getAllMetrics, getUser } from "@/lib/product-metrics";
import { DashboardHero } from "./components/DashboardHero";
import { MetricTile } from "./components/MetricTile";
import { VelocityPanel } from "./components/VelocityPanel";
import { ArrivalSignalLink } from "./components/ArrivalSignalLink";
import { DepthAcknowledgmentBanner } from "./components/DepthAcknowledgmentBanner";
import { ActionInvitationLayer } from "./components/ActionInvitationLayer";
import { ClickabilitySignal } from "./components/ClickabilitySignal";
import { HabitAcknowledgmentComponent } from "./components/HabitAcknowledgmentComponent";
import styles from "./components/dashboard.module.css";

export const dynamic = "force-dynamic";

const fmt = (n: number) =>
  n >= 1000 ? n.toLocaleString("en-US") : String(n);

const PRIOR_SPRINT_VELOCITY = 0;

export default async function Surface() {
  /*
   * Dashboard component render order — structural baseline for Sprint 12
   *
   * ABOVE-FOLD ZONE
   * 1. Welcome label
   * 2. DashboardHero (North Star Hero)
   * 3. ArrivalSignalLink (quiet above-fold signal to /arrival)
   * 4. Tile grid (primary metric grid)
   *
   * BELOW-FOLD ZONE
   * 5. VelocityPanel (sprint-over-sprint momentum)
   * 6. DepthAcknowledgmentBanner (Sprint 9 — quieted secondary register, Sprint 11)
   * 7. ActionInvitationLayer (Sprint 10)
   * 8. ClickabilitySignal (Sprint 10 — primary invitation register)
   * 9. HabitAcknowledgmentComponent (Sprint 11 — return acknowledgment, links to /arrival)
   */
  const user = getUser();
  const m = await getAllMetrics();
  const delta = m.velocity - PRIOR_SPRINT_VELOCITY;

  return (
    <main className="pad">
      <p className="label rise">welcome back, {user.name}</p>

      <DashboardHero
        northStarValue={m.northStar}
        npsLiftIndex={m.npsLiftIndex}
        featuresShipped={m.featureCount}
      />

      <ArrivalSignalLink />

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

      <DepthAcknowledgmentBanner />

      <ActionInvitationLayer />

      <ClickabilitySignal />

      <HabitAcknowledgmentComponent />
    </main>
  );
}
