import { getAllMetrics, getUser } from "@/lib/product-metrics";

export const dynamic = "force-dynamic";

const fmt = (n: number) =>
  n >= 1000 ? n.toLocaleString("en-US") : String(n);

export default async function Surface() {
  const user = getUser();
  const m = await getAllMetrics();

  const cards = [
    { label: "north star", value: fmt(m.northStar) },
    { label: "engagement", value: fmt(m.engagement) },
    { label: "velocity", value: m.velocity.toFixed(1) },
    { label: "features shipped", value: fmt(m.featureCount) },
    { label: "sprints shipped", value: fmt(m.sprintCount) },
    { label: "tests passing", value: `${m.testsPassing}%` },
    { label: "nps lift index", value: `+${m.npsLiftIndex}` },
    { label: "active users", value: "1" },
  ];

  return (
    <main className="pad">
      <p className="label rise">welcome back, {user.name}</p>
      <h1 className="declarative rise" style={{ marginTop: "0.5rem" }}>
        the product
      </h1>
      <p
        className="prose rise"
        style={{ marginTop: "1.25rem", color: "var(--ink-30)" }}
      >
        you are looking at the engagement dashboard. engagement with the
        engagement dashboard is reflected below. the north star is north-star
        aligned.
      </p>

      <div className="metrics rise" style={{ marginTop: "2.5rem" }}>
        {cards.map((c) => (
          <div className="metric" key={c.label}>
            <span className="label">{c.label}</span>
            <span className="value mono">{c.value}</span>
          </div>
        ))}
      </div>
    </main>
  );
}
