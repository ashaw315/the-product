import { StillnessMetricTile } from "./StillnessMetricTile";

type StillnessSurfaceProps = {
  northStar: number;
  engagement: number;
  velocity: number;
  featureCount: number;
  sprintCount: number;
  testsPassing: number;
};

export function StillnessSurface({
  northStar,
  engagement,
  velocity,
  featureCount,
  sprintCount,
  testsPassing,
}: StillnessSurfaceProps) {
  return (
    <section aria-label="stillness surface" data-testid="stillness-surface">
      <StillnessMetricTile label="North Star" value={northStar} />
      <StillnessMetricTile label="Engagement" value={engagement} />
      <StillnessMetricTile label="Velocity" value={velocity} />
      <StillnessMetricTile label="Features" value={featureCount} />
      <StillnessMetricTile label="Sprints" value={sprintCount} />
      <StillnessMetricTile label="Tests Passing" value={`${testsPassing}%`} />
    </section>
  );
}

export default StillnessSurface;
