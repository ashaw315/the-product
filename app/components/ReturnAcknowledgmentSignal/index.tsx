interface ReturnAcknowledgmentSignalProps {
  northStar: number;
}

export function ReturnAcknowledgmentSignal({
  northStar,
}: ReturnAcknowledgmentSignalProps) {
  return (
    <div data-testid="return-acknowledgment-signal" className="rise">
      <p className="label">return acknowledged</p>
      <p className="prose">
        the product registers your return. north star is currently at{" "}
        <span className="mono">{northStar}</span>.
      </p>
      <a href="/stillness">enter stillness</a>
    </div>
  );
}
