"use client";

type MetricDetailDrawerProps = {
  isOpen: boolean;
  label?: string;
  value?: string | number;
  onClose?: () => void;
};

export function MetricDetailDrawer({
  isOpen,
  label,
  value,
  onClose,
}: MetricDetailDrawerProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-label="metric detail"
      data-testid="metric-detail-drawer"
    >
      {label && <p className="label">{label}</p>}
      {value !== undefined && <p className="mono">{value}</p>}
      {onClose && (
        <button onClick={onClose} className="label">
          Close
        </button>
      )}
    </div>
  );
}

export default MetricDetailDrawer;
