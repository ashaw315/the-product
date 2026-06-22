import Link from "next/link";

export function DiscoveryRibbon() {
  return (
    <nav aria-label="discovery ribbon" data-testid="discovery-ribbon">
      <ul>
        <li>
          <Link href="/" data-testid="ribbon-link-home">
            dashboard
          </Link>
        </li>
        <li>
          <a href="/surfaces" data-testid="ribbon-link-surfaces">
            surfaces
          </a>
        </li>
        <li>
          <a href="/presence" data-testid="ribbon-link-presence">
            return depth view
          </a>
        </li>
      </ul>
    </nav>
  );
}
