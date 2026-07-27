import Link from "next/link";
import { getFeatureCount } from "@/lib/product-metrics";

export async function DepthAcknowledgmentBanner() {
  const featureCount = await getFeatureCount();

  return (
    <section
      className="depth-banner--quieted"
      aria-label="depth acknowledgment banner"
      data-testid="depth-acknowledgment-banner"
    >
      <p style={{ fontWeight: "normal", color: "var(--ink-30)", fontSize: "0.95rem", lineHeight: 1.5 }}>
        The product has accumulated {featureCount} features. Depth is not a destination — it is the record of continuing.
      </p>
      <Link href="/evolution" style={{ fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--ink-30)" }}>
        See the evolution.
      </Link>
    </section>
  );
}

export default DepthAcknowledgmentBanner;
