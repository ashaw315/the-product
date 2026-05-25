"use client";

import styles from "./dashboard.module.css";

const NORTH_STAR_DESCRIPTOR =
  "this metric represents the product's primary measure of itself.";

const fmt = (n: number) =>
  n >= 1000 ? n.toLocaleString("en-US") : String(n);

type DashboardHeroProps = {
  northStarValue: number;
  npsLiftIndex: number;
  featuresShipped: number;
  onMetricClick?: (key: string) => void;
};

export function DashboardHero({
  northStarValue,
  npsLiftIndex,
  featuresShipped,
  onMetricClick,
}: DashboardHeroProps) {
  const handleClick = () => {
    if (onMetricClick) onMetricClick("northStar");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") handleClick();
  };

  return (
    <section
      className={`${styles.heroSection} rise`}
      aria-label="dashboard hero"
    >
      <div
        className={styles.heroTileWrapper}
        data-testid="metric-tile"
        onClick={onMetricClick ? handleClick : undefined}
        role={onMetricClick ? "button" : undefined}
        tabIndex={onMetricClick ? 0 : undefined}
        onKeyDown={onMetricClick ? handleKeyDown : undefined}
      >
        <p className={`label ${styles.northStarLabel}`}>North Star</p>
        <p
          className={`${styles.northStarValue} mono`}
          data-testid="north-star-value"
        >
          {fmt(northStarValue)}
        </p>
        <p className={styles.northStarDescriptor}>{NORTH_STAR_DESCRIPTOR}</p>
      </div>
      <div className={styles.heroSubRow}>
        <div className={styles.heroSubItem}>
          <span className="label">NPS Lift Index</span>
          <span
            className={`${styles.heroSubValue} mono`}
            data-testid="nps-lift-index"
          >
            {`+${npsLiftIndex}`}
          </span>
        </div>
        <div className={styles.heroSubItem}>
          <span className="label">Features Shipped</span>
          <span
            className={`${styles.heroSubValue} mono`}
            data-testid="features-shipped"
          >
            {fmt(featuresShipped)}
          </span>
        </div>
      </div>
    </section>
  );
}

export default DashboardHero;
