interface ContinuitySignalBannerProps {
  velocity: number;
  sprintCount: number;
}

export function ContinuitySignalBanner({
  velocity,
  sprintCount,
}: ContinuitySignalBannerProps) {
  return (
    <div
      data-testid="continuity-signal-banner"
      data-tonal-alignment="continuity"
      className="rise"
    >
      <p className="label">continuity signal</p>
      <p className="prose">
        {sprintCount} sprints of continuous delivery at{" "}
        <span className="mono">{velocity.toFixed(1)}</span> tickets per sprint.
      </p>
    </div>
  );
}
