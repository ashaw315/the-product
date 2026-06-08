import { getAllMetrics } from "@/lib/product-metrics";

export const dynamic = "force-dynamic";

export default async function SprintReflection() {
  const m = await getAllMetrics();

  return (
    <main className="pad" data-testid="sprint-reflection">
      <p className="declarative">
        {`sprint ${m.sprintCount}: the product has shipped ${m.featureCount} feature${m.featureCount !== 1 ? "s" : ""}, operating at a velocity of ${m.velocity.toFixed(1)} tickets per sprint. it continues to build toward what it is becoming.`}
      </p>
    </main>
  );
}
