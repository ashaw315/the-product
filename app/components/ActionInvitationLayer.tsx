import { getFeatureCount, getSprintCount } from "@/lib/product-metrics";
import Link from "next/link";
import styles from "./action-invitation-layer.module.css";

const routes = [
  { path: "/engagement", label: "Engagement", descriptor: "Engage with engagement itself." },
  { path: "/stillness", label: "Stillness", descriptor: "The surface that does not move." },
  { path: "/returns", label: "Returns", descriptor: "Every return is a signal." },
  { path: "/presence", label: "Presence", descriptor: "The product is present. So are you." },
  { path: "/surfaces", label: "Surfaces", descriptor: "The product surfaces its own surfaces." },
  { path: "/orientation", label: "Orientation", descriptor: "Orienting toward the product's own north." },
  { path: "/reflection", label: "Reflection", descriptor: "The product reflects on what it has built." },
  { path: "/wayfinding", label: "Wayfinding", descriptor: "The full map of everywhere the product exists." },
];

export async function ActionInvitationLayer() {
  const [featureCount, sprintCount] = await Promise.all([
    getFeatureCount(),
    getSprintCount(),
  ]);

  return (
    <section aria-label="action invitation layer" data-testid="action-invitation-layer">
      <p className="declarative">
        <span data-testid="feature-count">{featureCount}</span> surfaces across{" "}
        <span data-testid="sprint-count">{sprintCount}</span> sprints. Explore the depth.
      </p>
      <nav aria-label="product routes" className={styles.grid}>
        {routes.map(({ path, label, descriptor }) => (
          <Link key={path} href={path} className={styles.invitation}>
            <span className="label">{label}</span>
            <span className="declarative">{descriptor}</span>
          </Link>
        ))}
      </nav>
    </section>
  );
}
