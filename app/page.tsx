import { getAllMetrics, getUser } from "@/lib/product-metrics";
import { DashboardHero } from "./components/DashboardHero";
import { MetricTile } from "./components/MetricTile";
import { VelocityPanel } from "./components/VelocityPanel";
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

      <VelocityPanel currentVelocity={m.velocity} delta={delta} />
    </main>
  );
}
