interface LatentEngagementIndicatorProps {
  engagement: number;
  northStar: number;
}

export function LatentEngagementIndicator({
  engagement,
  northStar,
}: LatentEngagementIndicatorProps) {
  return (
    <section data-testid="latent-engagement-indicator" className="rise">
      <p className="label">latent engagement</p>
      <p className="prose">
        the product has continued accumulating since the last time this surface
        was encountered. engagement stands at{" "}
        <span className="mono">{engagement}</span> and north star at{" "}
        <span className="mono">{northStar}</span>. returning here means the
        product has kept growing in your absence.
      </p>
      <a href="/returns">explore the full accumulation record</a>
    </section>
  );
}
