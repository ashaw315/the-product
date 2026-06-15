import { getAllMetrics } from "@/lib/product-metrics";

export const dynamic = "force-dynamic";

const ROUTES = [
  {
    name: "/",
    href: "/",
    description:
      "The primary dashboard — the product's own engagement surface, rendered live.",
  },
  {
    name: "/engagement",
    href: "/engagement",
    description:
      "The engagement view — metrics rendered for deliberate, unhurried inspection.",
  },
  {
    name: "/reflection",
    href: "/reflection",
    description:
      "The reflection surface — a space to observe what the product has become.",
  },
  {
    name: "/surfaces",
    href: "/surfaces",
    description:
      "The surface index — this page — a structured index of every named surface and component modality.",
  },
];

const COMPONENT_MODALITIES = [
  {
    name: "North Star Hero",
    description:
      "The primary hero display for the North Star metric, positioned above the tile grid.",
  },
  {
    name: "Velocity Panel",
    description:
      "The sprint-over-sprint momentum panel, rendered with a signed directional delta.",
  },
  {
    name: "NPS Lift Index Hero",
    description:
      "The secondary hero display for the NPS Lift Index, beside the Features Shipped count.",
  },
  {
    name: "Guided Orientation Banner",
    description:
      "The navigation layer linking the user to the engagement view and the surface index.",
  },
  {
    name: "Return Beacon",
    description:
      "The above-the-fold orientation signal that greets the returning user.",
  },
  {
    name: "Anticipation Layer",
    description:
      "The below-the-fold layer that surfaces the product's forward velocity and trajectory.",
  },
  {
    name: "Metric Detail Drawer",
    description:
      "An expandable component that surfaces granular detail behind a summary metric.",
  },
  {
    name: "Interactivity Signal Layer",
    description:
      "The layer that signals the product's interactive capabilities to the user.",
  },
  {
    name: "Quiet State Module",
    description:
      "The module that renders gracefully when metrics are at rest or approaching zero.",
  },
  {
    name: "Depth Indicator",
    description:
      "The end-of-page component that communicates the product's accumulated depth as a count.",
  },
  {
    name: "Discovery Ribbon",
    description:
      "The slim rotation band above the fold that surfaces the product's named capabilities.",
  },
];

export default async function SurfacesPage() {
  const metrics = await getAllMetrics();

  return (
    <main className="pad">
      <h1 className="heading" data-testid="surfaces-heading">
        navigable surface index
      </h1>
      <p className="label" data-testid="surfaces-metrics-summary">
        {metrics.featureCount} features · {metrics.sprintCount} sprints · north
        star {metrics.northStar}
      </p>

      <section aria-label="routes" data-testid="surfaces-routes">
        <h2 className="label">routes</h2>
        <ul>
          {ROUTES.map((route) => (
            <li key={route.name}>
              <a href={route.href} className="mono">
                {route.name}
              </a>
              <span className="label"> — {route.description}</span>
            </li>
          ))}
        </ul>
      </section>

      <section aria-label="component modalities" data-testid="surfaces-modalities">
        <h2 className="label">component modalities</h2>
        <ul>
          {COMPONENT_MODALITIES.map((c) => (
            <li key={c.name}>
              <span className="mono">{c.name}</span>
              <span className="label"> — {c.description}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
