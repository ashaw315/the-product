import { getAllMetrics, getUser } from "@/lib/product-metrics";
import { OrientationBanner } from "./components/OrientationBanner";
import { DashboardShell } from "./components/DashboardShell";

export const dynamic = "force-dynamic";

const PRIOR_SPRINT_VELOCITY = 0;

export default async function Surface() {
  const user = getUser();
  const m = await getAllMetrics();
  const delta = m.velocity - PRIOR_SPRINT_VELOCITY;

  return (
    <main className="pad">
      <OrientationBanner />
      <p className="label rise">welcome back, {user.name}</p>
      <DashboardShell metrics={m} delta={delta} />
    </main>
  );
}
