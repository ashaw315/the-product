interface Metrics {
  northStar: number;
  velocity: number;
  featureCount: number;
  sprintCount: number;
  testsPassing: number;
}

interface ReturnSignalAccumulatorProps {
  metrics: Metrics;
}

export function ReturnSignalAccumulator({
  metrics,
}: ReturnSignalAccumulatorProps) {
  return (
    <div data-testid="return-signal-accumulator">
      <section data-layer="north-star" className="rise">
        <p className="label">North Star — primary measure of self-description</p>
        <p className="mono" data-testid="layer-north-star">
          {metrics.northStar}
        </p>
      </section>
      <section data-layer="velocity" className="rise">
        <p className="label">Velocity — rate of intentional accumulation</p>
        <p className="mono" data-testid="layer-velocity">
          {metrics.velocity.toFixed(1)}
        </p>
      </section>
      <section data-layer="feature-count" className="rise">
        <p className="label">
          Feature Count — accumulated surface area of capability
        </p>
        <p className="mono" data-testid="layer-feature-count">
          {metrics.featureCount}
        </p>
      </section>
      <section data-layer="sprint-count" className="rise">
        <p className="label">
          Sprint Count — number of intervals of intentional accumulation
        </p>
        <p className="mono" data-testid="layer-sprint-count">
          {metrics.sprintCount}
        </p>
      </section>
      <section data-layer="tests-passing" className="rise">
        <p className="label">
          Tests Passing — proportion of assertions holding across accumulation
        </p>
        <p className="mono" data-testid="layer-tests-passing">
          {`${metrics.testsPassing}%`}
        </p>
      </section>
    </div>
  );
}
