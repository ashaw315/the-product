import { getEngagement, getNorthStar } from "@/lib/product-metrics";

export async function LatentEngagementIndicator() {
  const [engagement, northStar] = await Promise.all([
    getEngagement(),
    getNorthStar(),
  ]);

  const latentRatio = northStar > 0 ? (engagement / northStar).toFixed(2) : "0.00";

  return (
    <section
      aria-label="latent engagement indicator"
      data-testid="latent-engagement-indicator"
    >
      <p className="label">Latent Engagement</p>
      <p className="declarative">
        The product holds more engagement than the surface reveals.
      </p>
      <div>
        <span className="label">Engagement </span>
        <span className="metric" data-testid="engagement-value">{engagement}</span>
      </div>
      <div>
        <span className="label">North Star </span>
        <span className="metric" data-testid="north-star-value">{northStar}</span>
      </div>
      <div>
        <span className="label">Latent Ratio </span>
        <span className="mono" data-testid="latent-ratio">{latentRatio}</span>
      </div>
    </section>
  );
}
