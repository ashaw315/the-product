import Link from "next/link";

export function DepthAcknowledgmentBanner() {
  return (
    <aside
      aria-label="depth acknowledgment banner"
      data-testid="depth-acknowledgment-banner"
    >
      <p className="declarative">
        The product has depth. There is more to discover — every surface opens onto another.
      </p>
      <Link
        href="/wayfinding"
        data-testid="wayfinding-cta"
        aria-label="Explore the full surface map"
      >
        Explore the full surface map →
      </Link>
    </aside>
  );
}
