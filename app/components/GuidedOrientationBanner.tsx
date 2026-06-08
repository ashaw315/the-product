export const QUIETED_THRESHOLD = 1;

type Props = {
  isQuieted: boolean;
};

export function GuidedOrientationBanner({ isQuieted }: Props) {
  if (isQuieted) {
    return (
      <p
        className="label"
        data-testid="guided-orientation-banner"
        data-state="quieted"
      >
        <a href="/engagement">engagement</a>
      </p>
    );
  }

  return (
    <div data-testid="guided-orientation-banner" data-state="full">
      <p className="declarative">
        the product is alive and accumulating. explore the patterns of how it is
        being encountered and engaged with.
      </p>
      <p className="label">
        <a href="/engagement">engagement dashboard →</a>
      </p>
    </div>
  );
}

export default GuidedOrientationBanner;
