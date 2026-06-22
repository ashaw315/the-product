type Props = {
  featureCount: number;
  testsPassing: number;
  sprintCount: number;
};

export function ProductCompletenessSignal({
  featureCount,
  testsPassing,
  sprintCount,
}: Props) {
  return (
    <section
      aria-label="product completeness signal"
      data-testid="product-completeness-signal"
    >
      <p className="label">completeness signal</p>
      <p>
        <span className="mono" data-testid="completeness-features">
          {featureCount}
        </span>{" "}
        features.{" "}
        <span className="mono" data-testid="completeness-tests">
          {`${testsPassing}%`}
        </span>{" "}
        tests passing.{" "}
        <span className="mono" data-testid="completeness-sprints">
          {sprintCount}
        </span>{" "}
        sprints accumulated. the product is complete enough to know itself.
      </p>
    </section>
  );
}
