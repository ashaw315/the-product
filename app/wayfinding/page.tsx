import { getAllMetrics } from "@/lib/product-metrics";

export const dynamic = "force-dynamic";

type Metrics = Awaited<ReturnType<typeof getAllMetrics>>;

const routes: Array<{
  path: string;
  label: string;
  descriptor: string;
  metricKey: keyof Metrics;
  metricLabel: string;
}> = [
  { path: "/", label: "Dashboard", descriptor: "The primary surface. The beginning of the product.", metricKey: "northStar", metricLabel: "North Star" },
  { path: "/engagement", label: "Engagement", descriptor: "Engage with engagement itself.", metricKey: "engagement", metricLabel: "Engagement" },
  { path: "/stillness", label: "Stillness", descriptor: "The surface that does not move.", metricKey: "northStar", metricLabel: "North Star" },
  { path: "/returns", label: "Returns", descriptor: "Every return is a signal.", metricKey: "sprintCount", metricLabel: "Sprints" },
  { path: "/presence", label: "Presence", descriptor: "The product is present. So are you.", metricKey: "featureCount", metricLabel: "Features" },
  { path: "/surfaces", label: "Surfaces", descriptor: "The product surfaces its own surfaces.", metricKey: "featureCount", metricLabel: "Features" },
  { path: "/orientation", label: "Orientation", descriptor: "Orienting toward the product's own north.", metricKey: "northStar", metricLabel: "North Star" },
  { path: "/reflection", label: "Reflection", descriptor: "The product reflects on what it has built.", metricKey: "sprintCount", metricLabel: "Sprints" },
];

export default async function WayfindingMosaic() {
  const m = await getAllMetrics();

  return (
    <main className="pad">
      <p className="label">wayfinding mosaic</p>
      <h1 className="heading" data-testid="wayfinding-heading">Wayfinding Mosaic</h1>
      <p className="declarative">
        The full surface area of the product, reflected back.
      </p>
      <section aria-label="route mosaic" data-testid="route-mosaic">
        {routes.map(({ path, label, descriptor, metricKey, metricLabel }) => (
          <article
            key={path}
            data-testid={`tile-${path === "/" ? "home" : path.replace("/", "")}`}
          >
            <p className="mono">{path}</p>
            <p className="label">{label}</p>
            <p className="declarative">{descriptor}</p>
            <p>
              <span className="label">{metricLabel}: </span>
              <span className="metric" data-testid={`metric-${path === "/" ? "home" : path.replace("/", "")}`}>
                {m[metricKey]}
              </span>
            </p>
          </article>
        ))}
      </section>
    </main>
  );
}
