import { getVelocity, getFeatureCount } from "@/lib/product-metrics";

export async function AnticipationLayer() {
  const velocity = await getVelocity();
  const featureCount = await getFeatureCount();

  return (
    <p className="declarative" data-testid="anticipation-layer">
      {`the product is becoming — ${featureCount} feature${featureCount !== 1 ? "s" : ""} accumulated, shipping at ${velocity.toFixed(1)} tickets per sprint.`}
    </p>
  );
}

export default AnticipationLayer;
