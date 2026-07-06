type ThresholdMomentProps = {
  value: number;
  threshold: number;
};

export function ThresholdMoment({ value, threshold }: ThresholdMomentProps) {
  const crossed = value >= threshold;

  return (
    <div data-testid="threshold-moment" data-crossed={String(crossed)}>
      {crossed ? (
        <p className="prose">the threshold has been reached.</p>
      ) : (
        <p className="prose">the threshold has not yet been reached.</p>
      )}
    </div>
  );
}

export default ThresholdMoment;
