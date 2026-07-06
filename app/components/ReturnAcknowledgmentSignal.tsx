type ReturnAcknowledgmentSignalProps = {
  sprintCount: number;
  featureCount: number;
};

export function ReturnAcknowledgmentSignal({
  sprintCount,
  featureCount,
}: ReturnAcknowledgmentSignalProps) {
  return (
    <div data-testid="return-acknowledgment-signal">
      <p className="prose">
        you have returned. {sprintCount} sprints. {featureCount} features. the
        product continues.
      </p>
    </div>
  );
}

export default ReturnAcknowledgmentSignal;
