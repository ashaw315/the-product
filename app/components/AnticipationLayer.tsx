import { getVelocity } from "@/lib/product-metrics";
import styles from "./dashboard.module.css";

export async function AnticipationLayer() {
  const velocity = await getVelocity();

  return (
    <section
      aria-label="anticipation layer"
      data-testid="anticipation-layer"
      className={styles.anticipationLayer}
    >
      <p className="label">
        {velocity > 0
          ? `the product is shipping at ${velocity.toFixed(1)} tickets per sprint.`
          : "the product is gathering scope."}
      </p>
    </section>
  );
}

export default AnticipationLayer;
