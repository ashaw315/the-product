type Props = { engagement: number };

export function InteractivitySignalLayer({ engagement }: Props) {
  return (
    <section
      aria-label="interactivity signal layer"
      data-testid="interactivity-signal-layer"
    >
      <p className="label">signal</p>
      <p>
        <span className="mono" data-testid="signal-engagement">
          {engagement}
        </span>{" "}
        engagement events recorded. the product is live.
      </p>
    </section>
  );
}
