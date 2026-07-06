import {
  getNorthStar,
  getEngagement,
  getVelocity,
  getFeatureCount,
  getSprintCount,
  getTestsPassing,
} from "@/lib/product-metrics";
import { StillnessSurface } from "../components/StillnessSurface";

export const dynamic = "force-dynamic";

export default async function StillnessPage() {
  const [northStar, engagement, velocity, featureCount, sprintCount, testsPassing] =
    await Promise.all([
      getNorthStar(),
      getEngagement(),
      getVelocity(),
      getFeatureCount(),
      getSprintCount(),
      getTestsPassing(),
    ]);

  return (
    <main className="pad">
      <h1 className="heading" data-testid="stillness-heading">
        you are here. that is enough.
      </h1>
      <StillnessSurface
        northStar={northStar}
        engagement={engagement}
        velocity={velocity}
        featureCount={featureCount}
        sprintCount={sprintCount}
        testsPassing={testsPassing}
      />
    </main>
  );
}
