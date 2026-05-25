"use client";

import { useEffect } from "react";
import styles from "./dashboard.module.css";

export const METRIC_NARRATIVES: Record<string, string> = {
  northStar:
    "North Star measures the degree to which the product is the product. The north star is the product being itself.",
  engagement:
    "Engagement measures the degree to which the product is engaged with. It is currently engaged. Engagement is the product engaging.",
  velocity:
    "Velocity measures the speed at which the product produces itself. Velocity is the product in motion.",
  featureCount:
    "Feature Count measures the number of features the product has shipped. Each feature is the product, expressed.",
  sprintCount:
    "Sprint Count measures the number of sprints the product has completed. Each sprint is the product, iterated.",
  testsPassing:
    "Tests Passing measures the degree to which the product validates itself. The product tests its own existence.",
  npsLiftIndex:
    "NPS Lift Index measures the lift the product provides to those who engage with it. The lift is the product lifting.",
};

type MetricDetailDrawerProps = {
  activeMetric: string | null;
  onClose: () => void;
};

export function MetricDetailDrawer({
  activeMetric,
  onClose,
}: MetricDetailDrawerProps) {
  useEffect(() => {
    if (!activeMetric) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeMetric, onClose]);

  const narrative = activeMetric
    ? (METRIC_NARRATIVES[activeMetric] ?? "This metric is the product.")
    : null;
  const isOpen = activeMetric !== null;

  return (
    <div
      className={`${styles.drawer}${isOpen ? ` ${styles.drawerOpen}` : ""}`}
      aria-hidden={!isOpen}
      data-testid="metric-detail-drawer"
    >
      <button
        className={styles.drawerClose}
        onClick={onClose}
        aria-label="close drawer"
        data-testid="drawer-close-button"
      >
        ×
      </button>
      <div className={styles.drawerContent}>
        {narrative && (
          <p
            className={styles.drawerNarrative}
            data-testid="drawer-narrative"
          >
            {narrative}
          </p>
        )}
      </div>
    </div>
  );
}

export default MetricDetailDrawer;
