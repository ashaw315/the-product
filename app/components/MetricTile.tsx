import styles from "./dashboard.module.css";

type MetricTileProps = {
  label: string;
  value: string | number;
  descriptor?: string;
  variant?: string;
};

export function MetricTile({
  label,
  value,
  descriptor,
  variant,
}: MetricTileProps) {
  const variantClass =
    variant === "engagement" ? ` ${styles.tileEngagement}` : "";
  return (
    <div
      className={`${styles.tile}${variantClass}`}
      data-variant={variant ?? "default"}
    >
      <span className={styles.tileLabel}>{label}</span>
      <span className={`${styles.tileValue} mono`}>{value}</span>
      {descriptor ? (
        <span className={styles.tileDescriptor}>{descriptor}</span>
      ) : null}
    </div>
  );
}

export default MetricTile;
