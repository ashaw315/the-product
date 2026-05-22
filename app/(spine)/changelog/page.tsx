import { getReleaseNotes } from "@/lib/spine";

export const dynamic = "force-dynamic";

export default async function Changelog() {
  const notes = (await getReleaseNotes()) as {
    number: number;
    release_notes: string;
  }[];

  return (
    <main className="pad">
      <h1 className="heading rise">changelog</h1>
      {notes.length === 0 ? (
        <p className="prose" style={{ marginTop: "2rem", color: "var(--ink-30)" }}>
          nothing has shipped yet. the product exists.
        </p>
      ) : (
        <div className="stack rise" style={{ marginTop: "2rem" }}>
          {notes.map((n) => (
            <div key={n.number}>
              <p className="label">sprint {n.number}</p>
              <p className="prose" style={{ marginTop: "0.5rem" }}>
                {n.release_notes}
              </p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
