type AllMetrics = {
  sprintCount: number;
  featureCount: number;
  velocity: number;
  engagement: number;
  northStar: number;
  testsPassing: number;
  npsLiftIndex: number;
};

type Props = { metrics: AllMetrics };

export function MetricAccumulationTimeline({ metrics }: Props) {
  const entries = [
    { label: "north star", value: String(metrics.northStar) },
    { label: "features shipped", value: String(metrics.featureCount) },
    { label: "sprints accumulated", value: String(metrics.sprintCount) },
    { label: "velocity", value: metrics.velocity.toFixed(1) },
    { label: "engagement", value: String(metrics.engagement) },
    { label: "tests passing", value: `${metrics.testsPassing}%` },
    { label: "nps lift index", value: `+${metrics.npsLiftIndex}` },
  ];

  return (
    <section
      aria-label="metric accumulation timeline"
      data-testid="metric-accumulation-timeline"
    >
      <p className="label">accumulated state</p>
      <ol>
        {entries.map((entry) => (
          <li key={entry.label} data-testid="timeline-entry">
            <span className="label">{entry.label}</span>
            {" — "}
            <span className="mono">{entry.value}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
