import Link from "next/link";
import { getNorthStar, getSprintCount, getFeatureCount } from "@/lib/product-metrics";

export const dynamic = "force-dynamic";

export default async function ArrivalPage() {
  const northStar = await getNorthStar();
  const sprintCount = await getSprintCount();
  const featureCount = await getFeatureCount();

  return (
    <main className="pad">
      <h1 className="heading" style={{ marginBottom: "3rem" }}>Something Showed Up</h1>

      <section aria-label="north star hero zone" style={{ marginBottom: "3rem", paddingBottom: "2rem", borderBottom: "1.5px solid var(--ink)" }}>
        <p className="prose">
          The north star is {northStar}. It was here before you arrived and it is here now.
        </p>
      </section>

      <section aria-label="sprint count zone" style={{ marginBottom: "3rem", paddingBottom: "2rem", borderBottom: "1.5px solid var(--ink)" }}>
        <p className="prose">
          The product has completed {sprintCount} sprints. Each one continued.
        </p>
      </section>

      <section aria-label="feature count zone" style={{ marginBottom: "4rem" }}>
        <p className="prose">
          There are {featureCount} features. They accumulated while you were away.
        </p>
      </section>

      <nav aria-label="return navigation" style={{ borderTop: "1.5px solid var(--ink)", paddingTop: "2rem" }}>
        <Link href="/" className="label">Return to the dashboard.</Link>
      </nav>
    </main>
  );
}
