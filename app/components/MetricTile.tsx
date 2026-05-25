"use client";

import Link from "next/link";
import { ReactNode } from "react";
import styles from "./dashboard.module.css";

type MetricTileProps = {
  label?: string;
  value?: string | number;
  descriptor?: string;
  variant?: string;
  metricKey?: string;
  onMetricClick?: (key: string) => void;
  href?: string;
  children?: ReactNode;
};

export function MetricTile({
  label,
  value,
  descriptor,
  variant,
  metricKey,
  onMetricClick,
  href,
  children,
}: MetricTileProps) {
  const variantClass =
    variant === "engagement" ? ` ${styles.tileEngagement}` : "";
  const interactiveClass = metricKey ? ` ${styles.tileInteractive}` : "";

  const handleClick = () => {
    if (metricKey && onMetricClick) {
      onMetricClick(metricKey);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === "Enter" || e.key === " ") && metricKey) {
      handleClick();
    }
  };

  const content = children ?? (
    <>
      <span className={styles.tileLabel}>{label}</span>
      <span className={`${styles.tileValue} mono`}>{value}</span>
      {descriptor ? (
        <span className={styles.tileDescriptor}>{descriptor}</span>
      ) : null}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={`${styles.tile}${variantClass}${interactiveClass}`}
        data-variant={variant ?? "default"}
        data-testid="metric-tile"
      >
        {content}
      </Link>
    );
  }

  return (
    <div
      className={`${styles.tile}${variantClass}${interactiveClass}`}
      data-variant={variant ?? "default"}
      data-testid="metric-tile"
      onClick={metricKey ? handleClick : undefined}
      role={metricKey ? "button" : undefined}
      tabIndex={metricKey ? 0 : undefined}
      onKeyDown={metricKey ? handleKeyDown : undefined}
    >
      {content}
    </div>
  );
}

export default MetricTile;
