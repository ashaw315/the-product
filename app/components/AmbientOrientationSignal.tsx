import { getFeatureCount, getVelocity } from "@/lib/product-metrics";

export async function AmbientOrientationSignal() {
  const [featureCount, velocity] = await Promise.all([
    getFeatureCount(),
    getVelocity(),
  ]);

  return (
    <section
      aria-label="ambient orientation signal"
      data-testid="ambient-orientation-signal"
    >
      <p className="label">orientation</p>
      <p data-testid="orientation-prompt">
        this product carries{" "}
        <span className="mono" data-testid="orientation-feature-count">
          {featureCount}
        </span>{" "}
        features at{" "}
        <span className="mono" data-testid="orientation-velocity">
          {velocity.toFixed(1)}
        </span>{" "}
        velocity. looking around is intentional and correct.
      </p>
    </section>
  );
}
