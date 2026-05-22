import { getSprintList } from "@/lib/spine";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function Specs() {
  const list = (await getSprintList()) as {
    number: number;
    title: string;
    pm_name: string | null;
  }[];

  return (
    <main className="pad">
      <h1 className="heading rise">specs</h1>
      <div className="stack rise" style={{ marginTop: "2rem" }}>
        {list.map((s) => (
          <div
            key={s.number}
            style={{ display: "flex", gap: "1.5rem", alignItems: "baseline" }}
          >
            <span className="mono label" style={{ minWidth: "4rem" }}>
              SP-{s.number}
            </span>
            <Link href={`/specs/${s.number}`} style={{ fontWeight: 500 }}>
              {s.title}
              {s.pm_name ? (
                <span style={{ color: "var(--ink-30)", fontWeight: 400 }}>
                  {" "}
                  — {s.pm_name}
                </span>
              ) : null}
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
