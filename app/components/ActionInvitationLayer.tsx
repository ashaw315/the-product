import { getNorthStar, getEngagement } from "@/lib/product-metrics";

export async function ActionInvitationLayer() {
  const northStar = await getNorthStar();
  const engagement = await getEngagement();

  return (
    <section
      aria-label="action invitation layer"
      data-testid="action-invitation-layer"
      style={{ marginTop: "2.5rem", padding: "1.5rem", border: "1.5px solid var(--ink)" }}
    >
      <h2 className="heading" style={{ marginBottom: "1rem" }}>Take Action</h2>
      <p className="prose">
        The north star stands at {northStar}. This surface has been visited {engagement} times. Each visit is a form of participation.
      </p>
    </section>
  );
}

export default ActionInvitationLayer;
