import styles from "./dashboard.module.css";

interface Props {
  quieted?: boolean;
}

export function GuidedOrientationBanner({ quieted = false }: Props) {
  return (
    <nav
      aria-label="guided orientation banner"
      data-testid="guided-orientation-banner"
      data-quieted={quieted}
      className={quieted ? `${styles.banner} ${styles.bannerQuieted}` : styles.banner}
    >
      <a href="/engagement" className={styles.bannerLink}>
        view engagement
      </a>
      <span className={styles.bannerSep} aria-hidden="true"> · </span>
      <a href="/surfaces" className={styles.bannerLink}>
        view all surfaces
      </a>
    </nav>
  );
}

export default GuidedOrientationBanner;
