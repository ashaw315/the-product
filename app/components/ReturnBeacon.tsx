type Props = { sprintCount: number };

export function ReturnBeacon({ sprintCount }: Props) {
  return (
    <section aria-label="return beacon" data-testid="return-beacon">
      <p className="label">return beacon</p>
      <p>
        sprint{" "}
        <span className="mono" data-testid="beacon-sprint-count">
          {sprintCount}
        </span>
        . you have returned. the product continues.
      </p>
    </section>
  );
}
