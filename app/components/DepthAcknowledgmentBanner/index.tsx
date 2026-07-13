interface DepthAcknowledgmentBannerProps {
  northStar: number;
  sprintCount: number;
}

export function DepthAcknowledgmentBanner({
  northStar,
  sprintCount,
}: DepthAcknowledgmentBannerProps) {
  return (
    <section
      data-testid="depth-acknowledgment-banner"
      data-north-star={northStar}
      className="rise"
    >
      <h2 className="heading">{sprintCount} sprints of depth</h2>
      <p className="prose">
        you are returning to a product that has grown intentionally across{" "}
        {sprintCount} sprints. welcome back.
      </p>
    </section>
  );
}
