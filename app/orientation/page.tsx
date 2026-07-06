import {
  getSprintCount,
  getFeatureCount,
  getVelocity,
} from "@/lib/product-metrics";

export const dynamic = "force-dynamic";

export default async function OrientationPage() {
  const [sprintCount, featureCount, velocity] = await Promise.all([
    getSprintCount(),
    getFeatureCount(),
    getVelocity(),
  ]);

  return (
    <main className="pad" data-testid="orientation-page">
      <h1 className="heading" data-testid="orientation-heading">
        orientation
      </h1>
      <p className="prose" data-testid="orientation-content">
        {sprintCount} sprints. {featureCount} features. {velocity} tickets per
        sprint.
      </p>
    </main>
  );
}
