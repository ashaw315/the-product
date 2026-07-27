import Link from "next/link";

export function ArrivalSignalLink() {
  return (
    <p
      style={{ marginTop: "1rem", fontSize: "0.85rem", letterSpacing: "0.04em", color: "var(--ink-30)" }}
      data-testid="arrival-signal-link"
    >
      <Link href="/arrival">Something showed up.</Link>
    </p>
  );
}

export default ArrivalSignalLink;
