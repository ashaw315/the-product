import { getFeatureCount, getSprintCount } from "@/lib/product-metrics";

export async function ProductCompletenessSignal() {
  const featureCount = await getFeatureCount();
  const sprintCount = await getSprintCount();

  return (
    <p className="label" data-testid="product-completeness-signal">
      {featureCount} features across {sprintCount} sprints.
    </p>
  );
}

export default ProductCompletenessSignal;
