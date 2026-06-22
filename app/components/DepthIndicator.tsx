type Props = { featureCount: number; sprintCount: number };

export function DepthIndicator({ featureCount, sprintCount }: Props) {
  return (
    <section aria-label="depth indicator" data-testid="depth-indicator">
      <p className="label">depth</p>
      <p>
        <span className="mono" data-testid="depth-feature-count">
          {featureCount}
        </span>{" "}
        features across{" "}
        <span className="mono" data-testid="depth-sprint-count">
          {sprintCount}
        </span>{" "}
        sprints.
      </p>
    </section>
  );
}
