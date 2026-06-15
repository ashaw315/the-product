import { getFeatureCount } from "@/lib/product-metrics";
import styles from "./dashboard.module.css";

export async function DepthIndicator() {
  const featureCount = await getFeatureCount();

  return (
    <div
      aria-label="depth indicator"
      data-testid="depth-indicator"
      className={`${styles.depthIndicator} label`}
    >
      {featureCount} {featureCount === 1 ? "feature" : "features"} deep.
    </div>
  );
}

export default DepthIndicator;
