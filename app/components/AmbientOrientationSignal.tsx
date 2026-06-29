import { getEngagement } from "@/lib/product-metrics";

export default async function AmbientOrientationSignal() {
  const engagement = await getEngagement();

  const signal =
    engagement > 0
      ? `${engagement} engagement event${engagement !== 1 ? "s" : ""} recorded. Orientation is continuous.`
      : "Orientation begins now. The product is present.";

  return (
    <aside
      aria-label="ambient orientation signal"
      data-testid="ambient-orientation-signal"
      style={{ marginBottom: "1rem" }}
    >
      <p className="label" data-testid="orientation-signal-text">
        {signal}
      </p>
    </aside>
  );
}
