type Props = {
  sprintCount: number;
  featureCount: number;
  quieted?: boolean;
};

export function GuidedOrientationBanner({
  sprintCount,
  featureCount,
  quieted = false,
}: Props) {
  if (quieted) {
    return (
      <section
        aria-label="guided orientation banner"
        data-testid="guided-orientation-banner"
        data-quieted="true"
      >
        <p className="label">{`sprint ${sprintCount} of the product`}</p>
      </section>
    );
  }
  return (
    <section
      aria-label="guided orientation banner"
      data-testid="guided-orientation-banner"
      data-quieted="false"
    >
      <p className="label">orientation</p>
      <p>
        this is the product. it has shipped{" "}
        <span className="mono" data-testid="banner-feature-count">
          {featureCount}
        </span>{" "}
        features across{" "}
        <span className="mono" data-testid="banner-sprint-count">
          {sprintCount}
        </span>{" "}
        sprints. you are the user. the product knows itself.
      </p>
    </section>
  );
}
