type Metrics = {
  sprintCount: number;
  featureCount: number;
  velocity: number;
  engagement: number;
  northStar: number;
  testsPassing: number;
  npsLiftIndex: number;
};

type Props = { metrics: Metrics };

export function MetricDetailDrawer({ metrics }: Props) {
  return (
    <details aria-label="metric detail drawer" data-testid="metric-detail-drawer">
      <summary className="label">metric detail</summary>
      <dl>
        <dt className="label">north star</dt>
        <dd className="mono" data-testid="drawer-north-star">
          {metrics.northStar}
        </dd>
        <dt className="label">engagement</dt>
        <dd className="mono">{metrics.engagement}</dd>
        <dt className="label">velocity</dt>
        <dd className="mono">{metrics.velocity.toFixed(1)}</dd>
        <dt className="label">features</dt>
        <dd className="mono">{metrics.featureCount}</dd>
        <dt className="label">sprints</dt>
        <dd className="mono">{metrics.sprintCount}</dd>
        <dt className="label">tests passing</dt>
        <dd className="mono">{metrics.testsPassing}%</dd>
        <dt className="label">nps lift index</dt>
        <dd className="mono">+{metrics.npsLiftIndex}</dd>
      </dl>
    </details>
  );
}
