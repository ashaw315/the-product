import { getFeatureCount, getVelocity } from "@/lib/product-metrics";
import styles from "./clickability-signal.module.css";

export async function ClickabilitySignal() {
  const [featureCount, velocity] = await Promise.all([
    getFeatureCount(),
    getVelocity(),
  ]);

  return (
    <section aria-label="clickability signal" data-testid="clickability-signal">
      <p className="label">Clickability Signal</p>
      <p className="declarative">
        The number of things to click on is always growing.
        The product currently has{" "}
        <span className={styles.pulse} data-testid="feature-count">{featureCount}</span>{" "}
        surfaces — and that number is not standing still.
      </p>
      <div>
        <span className="label">Velocity </span>
        <span className="metric" data-testid="velocity-value">{velocity.toFixed(1)}</span>
      </div>
    </section>
  );
}
