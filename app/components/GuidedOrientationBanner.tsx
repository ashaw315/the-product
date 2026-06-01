export default function GuidedOrientationBanner() {
  return (
    <aside
      aria-label="guided orientation banner"
      data-testid="guided-orientation-banner"
    >
      <p className="label">You are here. This is the product.</p>
      <a href="/engagement">
        Explore engagement with the engagement dashboard.
      </a>
    </aside>
  );
}
