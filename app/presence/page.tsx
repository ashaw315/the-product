import { getAllMetrics } from "@/lib/product-metrics";

export const dynamic = "force-dynamic";
import PresenceLayer from "../components/PresenceLayer";

export default async function ReturnDepthView() {
  const m = await getAllMetrics();

  return (
    <main className="pad">
      <p className="label">presence</p>
      <h1 className="heading" style={{ marginTop: "0.5rem", marginBottom: "1.5rem" }}>
        Return Depth
      </h1>
      <p className="prose" style={{ marginBottom: "1.5rem" }}>
        The product remembers. Across{" "}
        <span className="mono" data-testid="return-depth-engagement">
          {m.engagement}
        </span>{" "}
        engagement event{m.engagement !== 1 ? "s" : ""}, the user has returned.
      </p>
      <PresenceLayer engagement={m.engagement} sprintCount={m.sprintCount} />
    </main>
  );
}
