import { getSpec } from "@/lib/spine";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

type Prd = {
  title: string;
  vision_statement: string | null;
  problem_statement: string | null;
  proposed_solution: string | null;
  success_metrics: string[] | null;
  non_goals: string[] | null;
};

type Ticket = {
  id: string;
  title: string;
  description: string | null;
  acceptance_criteria: string[] | null;
  priority: string | null;
  estimate: string | null;
};

export default async function Spec({
  params,
}: {
  params: Promise<{ sprint: string }>;
}) {
  const { sprint } = await params;
  const n = Number(sprint);
  if (!Number.isInteger(n)) notFound();

  const spec = (await getSpec(n)) as
    | (Record<string, unknown> & { prd: Prd; tickets: Ticket[] })
    | null;
  if (!spec) notFound();

  const prd = spec.prd;

  return (
    <main className="pad">
      <p className="label rise">sprint {n}</p>
      <h1 className="heading rise" style={{ marginTop: "0.5rem" }}>
        {prd.title}
      </h1>
      {spec.pm_name ? (
        <p className="mono rise" style={{ fontSize: "0.75rem", color: "var(--ink-30)", marginTop: "0.5rem" }}>
          {String(spec.pm_name)}, {String(spec.pm_title ?? "")}
        </p>
      ) : null}

      <section className="prose rise" style={{ marginTop: "2.5rem" }}>
        {prd.vision_statement ? (
          <p style={{ fontStyle: "italic" }}>“{prd.vision_statement}”</p>
        ) : null}
        {prd.problem_statement ? (
          <>
            <p className="label" style={{ marginTop: "2rem" }}>problem</p>
            <p>{prd.problem_statement}</p>
          </>
        ) : null}
        {prd.proposed_solution ? (
          <>
            <p className="label" style={{ marginTop: "2rem" }}>proposed solution</p>
            <p>{prd.proposed_solution}</p>
          </>
        ) : null}
        {prd.success_metrics?.length ? (
          <>
            <p className="label" style={{ marginTop: "2rem" }}>success metrics</p>
            <ul style={{ paddingLeft: "1.1rem" }}>
              {prd.success_metrics.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          </>
        ) : null}
        {prd.non_goals?.length ? (
          <>
            <p className="label" style={{ marginTop: "2rem" }}>non-goals</p>
            <ul style={{ paddingLeft: "1.1rem" }}>
              {prd.non_goals.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          </>
        ) : null}
      </section>

      {spec.tickets?.length ? (
        <section className="rise" style={{ marginTop: "3rem" }}>
          <p className="label">tickets</p>
          <div className="stack" style={{ marginTop: "1rem" }}>
            {spec.tickets.map((t) => (
              <div key={t.id}>
                <p>
                  <span className="mono" style={{ color: "var(--ink-30)" }}>{t.id}</span>{" "}
                  <span style={{ fontWeight: 500 }}>{t.title}</span>{" "}
                  <span className="mono label">{t.priority} · {t.estimate}</span>
                </p>
                {t.description ? (
                  <p style={{ color: "var(--ink-30)", marginTop: "0.4rem", fontSize: "0.9rem" }}>
                    {t.description}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
