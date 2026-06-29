import { getEngagement } from "@/lib/product-metrics";

export const dynamic = "force-dynamic";

export default async function EngagementPage() {
  const engagement = await getEngagement();

  return (
    <main className="pad">
      <p className="label">engagement</p>
      <h1 className="heading" style={{ marginTop: "0.5rem", marginBottom: "1.5rem" }}>
        Engagement
      </h1>
      <p className="prose">
        The product measures itself. Current engagement:{" "}
        <span className="mono" data-testid="engagement-value">
          {engagement}
        </span>
        .
      </p>
    </main>
  );
}
