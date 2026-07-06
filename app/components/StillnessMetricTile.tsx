type StillnessMetricTileProps = {
  label: string;
  value: string | number;
};

export function StillnessMetricTile({ label, value }: StillnessMetricTileProps) {
  return (
    <div data-testid="stillness-metric-tile">
      <p className="label">{label}</p>
      <p className="mono">{value}</p>
    </div>
  );
}

export default StillnessMetricTile;
