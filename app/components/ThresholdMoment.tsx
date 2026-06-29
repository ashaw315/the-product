import { getVelocity, getFeatureCount, getNPSLiftIndex } from "@/lib/product-metrics";
import styles from "./ThresholdMoment.module.css";

export default async function ThresholdMoment() {
  const velocity = await getVelocity();
  const featureCount = await getFeatureCount();
  const npsLiftIndex = getNPSLiftIndex();

  return (
    <section
      className={styles.container}
      aria-label="threshold moment"
      data-testid="threshold-moment"
    >
      <p className="label">Threshold</p>
      <p className="heading">The product accumulates. The next sprint approaches.</p>
      <dl className={styles.metrics}>
        <div className={styles.metricItem}>
          <dt className="label">Velocity</dt>
          <dd className={styles.value} data-testid="threshold-velocity">{velocity.toFixed(1)}</dd>
        </div>
        <div className={styles.metricItem}>
          <dt className="label">Features Shipped</dt>
          <dd className={styles.value} data-testid="threshold-feature-count">{featureCount}</dd>
        </div>
        <div className={styles.metricItem}>
          <dt className="label">NPS Lift Index</dt>
          <dd className={styles.value} data-testid="threshold-nps-lift">+{npsLiftIndex}</dd>
        </div>
      </dl>
    </section>
  );
}
