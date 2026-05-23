import { getResearch } from "@/lib/spine";

export const dynamic = "force-dynamic";

export default async function Research() {
  const entries = (await getResearch()) as {
    number: number;
    user_research: string;
  }[];

  return (
    <main className="pad">
      <h1 className="heading rise">research</h1>
      <p className="label rise" style={{ marginTop: "0.75rem" }}>
        the user, in their own words
      </p>
      {entries.length === 0 ? (
        <p className="prose" style={{ marginTop: "2rem", color: "var(--ink-30)" }}>
          the user has not spoken yet.
        </p>
      ) : (
        <div className="stack rise" style={{ marginTop: "2rem" }}>
          {entries.map((e) => (
            <div key={e.number} style={{ display: "flex", gap: "1.5rem", alignItems: "baseline" }}>
              <span className="mono label" style={{ minWidth: "4rem" }}>
                wk {e.number}
              </span>
              <p className="prose" style={{ margin: 0 }}>
                {e.user_research}
              </p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
