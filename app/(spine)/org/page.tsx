import { getPMs } from "@/lib/spine";

export const dynamic = "force-dynamic";

export default async function Org() {
  const pms = (await getPMs()) as {
    name: string;
    latest_title: string;
    bio: string;
    first_sprint: number;
    last_sprint: number;
    status: string;
  }[];

  return (
    <main className="pad">
      <h1 className="heading rise">the org</h1>
      {pms.length === 0 ? (
        <p className="prose" style={{ marginTop: "2rem", color: "var(--ink-30)" }}>
          the org is forthcoming.
        </p>
      ) : (
        <div
          className="metrics rise"
          style={{ marginTop: "2rem", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))" }}
        >
          {pms.map((pm) => (
            <div className="metric" key={pm.name} style={{ minHeight: "11rem" }}>
              <div>
                <p className="label">
                  {pm.status === "active" ? "active" : "former"}
                </p>
                <p className="heading" style={{ fontSize: "1.4rem", marginTop: "0.5rem" }}>
                  {pm.name}
                </p>
                <p className="mono" style={{ fontSize: "0.72rem", color: "var(--ink-30)", marginTop: "0.4rem" }}>
                  {pm.latest_title}
                </p>
              </div>
              <p style={{ fontSize: "0.82rem", color: "var(--ink-30)" }}>
                {pm.bio}
              </p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
