import { getCaptures } from "@/lib/spine";

export const dynamic = "force-dynamic";

type Capture = {
  sprint_number: number;
  page: string;
  image_url: string;
};

const isPublicUrl = (u: string) => /^https?:\/\//i.test(u);

export default async function Evolution() {
  const rows = (await getCaptures()) as Capture[];

  // group by sprint, newest first (query already orders)
  const bySprint = new Map<number, Capture[]>();
  for (const r of rows) {
    if (!bySprint.has(r.sprint_number)) bySprint.set(r.sprint_number, []);
    bySprint.get(r.sprint_number)!.push(r);
  }

  return (
    <main className="pad">
      <h1 className="heading rise">evolution</h1>
      <p className="label rise" style={{ marginTop: "0.75rem" }}>
        the product, captured as it changes
      </p>

      {bySprint.size === 0 ? (
        <p className="prose" style={{ marginTop: "2rem", color: "var(--ink-30)" }}>
          the archive begins once captures are recorded.
        </p>
      ) : (
        <div className="rise" style={{ marginTop: "2.5rem", display: "flex", flexDirection: "column", gap: "3rem" }}>
          {[...bySprint.entries()].map(([sprint, caps]) => (
            <section key={sprint}>
              <p className="label">week {sprint}</p>
              <div
                style={{
                  marginTop: "1rem",
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                  gap: "1rem",
                }}
              >
                {caps.map((c) => (
                  <figure key={c.page} style={{ margin: 0 }}>
                    <div
                      style={{
                        border: "1.5px solid var(--ink)",
                        background: "var(--paper)",
                        aspectRatio: "4 / 3",
                        overflow: "hidden",
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "center",
                      }}
                    >
                      {isPublicUrl(c.image_url) ? (
                        <a href={c.image_url} target="_blank" rel="noreferrer" style={{ display: "block", width: "100%" }}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={c.image_url}
                            alt={`${c.page} at week ${sprint}`}
                            loading="lazy"
                            style={{ width: "100%", display: "block" }}
                          />
                        </a>
                      ) : (
                        <span
                          className="mono"
                          style={{ fontSize: "0.7rem", color: "var(--ink-30)", padding: "1rem", alignSelf: "center" }}
                        >
                          captured · pending storage
                        </span>
                      )}
                    </div>
                    <figcaption className="mono label" style={{ marginTop: "0.4rem" }}>
                      {c.page}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </main>
  );
}
