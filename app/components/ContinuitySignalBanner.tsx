import Link from "next/link";

type ContinuitySignalBannerProps = {
  sprintCount: number;
};

export function ContinuitySignalBanner({ sprintCount }: ContinuitySignalBannerProps) {
  return (
    <div data-testid="continuity-signal-banner">
      <p className="prose">
        the product has sustained {sprintCount} sprints. it remains in motion.
      </p>
      <Link href="/stillness">enter stillness</Link>
    </div>
  );
}

export default ContinuitySignalBanner;
