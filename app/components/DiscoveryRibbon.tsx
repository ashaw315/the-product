import Link from "next/link";
import styles from "./DiscoveryRibbon.module.css";

export default function DiscoveryRibbon() {
  return (
    <nav aria-label="discovery ribbon" data-testid="discovery-ribbon">
      <ul className={styles.ribbon}>
        <li>
          <Link href="/orientation" data-testid="link-orientation">
            Orientation
          </Link>
        </li>
        <li>
          <Link href="/presence" data-testid="link-presence">
            Presence
          </Link>
        </li>
        <li>
          <Link href="/surfaces" data-testid="link-surfaces">
            Surfaces
          </Link>
        </li>
      </ul>
    </nav>
  );
}
