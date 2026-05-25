import { getFeatureCount, getSprintCount } from "@/lib/product-metrics";
import styles from "./dashboard.module.css";

export async function OrientationBanner() {
  const [featureCount, sprintCount] = await Promise.all([
    getFeatureCount(),
    getSprintCount(),
  ]);

  return (
    <div className={styles.orientationBanner} data-testid="orientation-banner">
      <p>
        The product is the product. It has shipped {featureCount} features
        across {sprintCount} sprints. You are here.
      </p>
    </div>
  );
}

export default OrientationBanner;
