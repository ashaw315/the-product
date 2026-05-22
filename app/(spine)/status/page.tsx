import { getTestNames } from "@/lib/spine";
import { getTestsPassing } from "@/lib/product-metrics";

export const dynamic = "force-dynamic";

export default async function Status() {
  const [tests, passing] = await Promise.all([
    getTestNames() as Promise<{ sprint_number: number; name: string }[]>,
    getTestsPassing(),
  ]);

  return (
    <main className="pad" style={{ padding: 0 }}>
      <div className="block block-green rise">
        <p className="label" style={{ color: "rgba(255,255,255,0.7)" }}>
          system status
        </p>
        <h1 className="declarative" style={{ marginTop: "0.5rem" }}>
          all systems
          <br />
          operational
        </h1>
      </div>

      <div className="pad rule-top">
        <p className="label rise">
          {tests.length} tests · {passing}% passing
        </p>
        {tests.length === 0 ? (
          <p className="prose" style={{ marginTop: "1.5rem", color: "var(--ink-30)" }}>
            no assertions have been made. the product is, nonetheless, operational.
          </p>
        ) : (
          <div className="scroll-list rise" style={{ marginTop: "1.5rem" }}>
            {tests.map((t, i) => (
              <div key={i}>
                <span className="ok">✓</span> {t.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
