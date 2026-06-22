type Props = { velocity: number };

export function AnticipationLayer({ velocity }: Props) {
  return (
    <section aria-label="anticipation layer" data-testid="anticipation-layer">
      <p className="label">anticipation</p>
      <p>
        <span className="mono" data-testid="anticipation-velocity">
          {velocity.toFixed(1)}
        </span>{" "}
        tickets per sprint, sustained. the next sprint is already accumulating.
      </p>
    </section>
  );
}
