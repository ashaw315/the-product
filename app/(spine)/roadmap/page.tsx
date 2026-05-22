import { getRoadmap } from "@/lib/spine";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function Roadmap() {
  const items = (await getRoadmap()) as {
    number: number;
    title: string;
    vision: string;
  }[];

  return (
    <main className="pad">
      <h1 className="heading rise">roadmap</h1>
      <p className="label rise" style={{ marginTop: "0.75rem" }}>
        {items.length} initiatives · 0 complete
      </p>
      <div className="stack rise" style={{ marginTop: "2rem" }}>
        {items.map((it) => (
          <div
            key={it.number}
            style={{ display: "flex", gap: "1.5rem", alignItems: "baseline" }}
          >
            <span className="mono label" style={{ minWidth: "4rem" }}>
              SP-{it.number}
            </span>
            <span>
              <Link href={`/specs/${it.number}`} style={{ fontWeight: 500 }}>
                {it.title}
              </Link>
              <p style={{ color: "var(--ink-30)", marginTop: "0.25rem" }}>
                {it.vision}
              </p>
            </span>
          </div>
        ))}
      </div>
    </main>
  );
}
