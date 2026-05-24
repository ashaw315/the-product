import styles from "./dashboard.module.css";

type VelocityPanelProps = {
  currentVelocity: number;
  delta: number;
};

export function VelocityPanel({
  currentVelocity,
  delta,
}: VelocityPanelProps) {
  const direction: "up" | "flat" | "down" =
    delta > 0 ? "up" : delta < 0 ? "down" : "flat";

  const deltaClass =
    direction === "up"
      ? styles.deltaUp
      : direction === "down"
      ? styles.deltaDown
      : styles.deltaFlat;

  const arrow = direction === "up" ? "↑" : direction === "down" ? "↓" : "→";
  const sign = delta > 0 ? "+" : "";

  return (
    <section
      className={`${styles.velocityPanel} rise`}
      aria-label="velocity panel"
    >
      <div className={styles.velocityHeader}>
        <h2 className="heading">Velocity</h2>
        <p className={styles.velocitySubheader}>Sprint-over-Sprint Momentum</p>
      </div>
      <div className={styles.velocityRow}>
        <div className={styles.velocityCurrent}>
          <span className="label">Sprint Velocity</span>
          <span
            className={`${styles.velocityValue} mono`}
            data-testid="velocity-value"
          >
            {currentVelocity.toFixed(1)}
          </span>
        </div>
        <div
          className={`${styles.velocityDelta} ${deltaClass}`}
          data-direction={direction}
          data-testid="velocity-delta"
        >
          <span aria-hidden="true">{arrow}</span>
          <span>{`${sign}${delta.toFixed(1)}`}</span>
        </div>
      </div>
    </section>
  );
}

export default VelocityPanel;
