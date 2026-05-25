"use client";

import { useState } from "react";
import { DashboardHero } from "./DashboardHero";
import { MetricTile } from "./MetricTile";
import { VelocityPanel } from "./VelocityPanel";
import { MetricDetailDrawer } from "./MetricDetailDrawer";
import styles from "./dashboard.module.css";

type Metrics = {
  northStar: number;
  engagement: number;
  velocity: number;
  featureCount: number;
  sprintCount: number;
  testsPassing: number;
  npsLiftIndex: number;
};

const fmt = (n: number) =>
  n >= 1000 ? n.toLocaleString("en-US") : String(n);

type DashboardShellProps = {
  metrics: Metrics;
  delta: number;
};

export function DashboardShell({ metrics: m, delta }: DashboardShellProps) {
  const [activeMetric, setActiveMetric] = useState<string | null>(null);

  return (
    <>
      <DashboardHero
        northStarValue={m.northStar}
        npsLiftIndex={m.npsLiftIndex}
        featuresShipped={m.featureCount}
        onMetricClick={setActiveMetric}
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
          metricKey="northStar"
          onMetricClick={setActiveMetric}
        />
        <MetricTile
          label="Engagement"
          value={fmt(m.engagement)}
          descriptor="dashboard hits"
          metricKey="engagement"
          onMetricClick={setActiveMetric}
        />
        <MetricTile
          label="Velocity"
          value={m.velocity.toFixed(1)}
          descriptor="tickets per sprint"
          metricKey="velocity"
          onMetricClick={setActiveMetric}
        />
        <MetricTile
          label="Features Shipped"
          value={fmt(m.featureCount)}
          descriptor="features shipped"
          metricKey="featureCount"
          onMetricClick={setActiveMetric}
        />
        <MetricTile
          label="Sprints Shipped"
          value={fmt(m.sprintCount)}
          descriptor="sprints shipped"
          metricKey="sprintCount"
          onMetricClick={setActiveMetric}
        />
        <MetricTile
          label="Tests Passing"
          value={`${m.testsPassing}%`}
          descriptor="tests passing"
          metricKey="testsPassing"
          onMetricClick={setActiveMetric}
        />
        <MetricTile
          label="Engagement with the Engagement Dashboard"
          value={fmt(m.engagement)}
          descriptor="hits on this dashboard"
          variant="engagement"
          href="/engagement"
        />
      </section>

      <VelocityPanel currentVelocity={m.velocity} delta={delta} />

      <MetricDetailDrawer
        activeMetric={activeMetric}
        onClose={() => setActiveMetric(null)}
      />
    </>
  );
}

export default DashboardShell;
