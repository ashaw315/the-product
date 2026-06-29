type PresenceLayerProps = {
  engagement: number;
  sprintCount: number;
};

export default function PresenceLayer({ engagement, sprintCount }: PresenceLayerProps) {
  return (
    <section
      aria-label="presence layer"
      data-testid="presence-layer"
      style={{ borderTop: "1.5px solid var(--ink)", paddingTop: "1.5rem", marginTop: "1.5rem" }}
    >
      <p className="label">Presence Layer</p>
      <p className="heading">
        <span data-testid="presence-sprint-count">{sprintCount}</span>{" "}
        sprint{sprintCount !== 1 ? "s" : ""} of accumulation.
      </p>
      <p className="label" style={{ marginTop: "0.75rem" }}>
        Engagement:{" "}
        <span className="mono" data-testid="presence-engagement">{engagement}</span>
      </p>
    </section>
  );
}
