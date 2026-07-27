import { describe, it, expect, vi } from "vitest";
import { renderToString } from "react-dom/server";
import { createElement } from "react";

// Mock the metric primitives. Tests must never hit a real database.
vi.mock("@/lib/product-metrics", () => ({
  getUser: () => ({ id: "the-user", name: "the user", plan: "the plan" }),
  getNorthStar: async () => 14,
  getEngagement: async () => 42,
  getVelocity: async () => 6.5,
  getFeatureCount: async () => 6,
  getSprintCount: async () => 1,
  getTestsPassing: async () => 100,
  getNPSLiftIndex: () => 11.4,
  getAllMetrics: async () => ({
    sprintCount: 1,
    featureCount: 6,
    velocity: 6.5,
    engagement: 42,
    northStar: 14,
    testsPassing: 100,
    npsLiftIndex: 11.4,
  }),
}));

// Mock async sub-components so renderToString can handle the full page tree.
vi.mock("../app/components/DepthAcknowledgmentBanner", () => ({
  DepthAcknowledgmentBanner: () => createElement("div", { "data-mock": "depth-banner" }),
  default: () => createElement("div", { "data-mock": "depth-banner" }),
}));
vi.mock("../app/components/ActionInvitationLayer", () => ({
  ActionInvitationLayer: () => createElement("div", { "data-mock": "action-invitation-layer" }),
  default: () => createElement("div", { "data-mock": "action-invitation-layer" }),
}));
vi.mock("../app/components/ClickabilitySignal", () => ({
  ClickabilitySignal: () => createElement("div", { "data-mock": "clickability-signal" }),
  default: () => createElement("div", { "data-mock": "clickability-signal" }),
}));
vi.mock("../app/components/HabitAcknowledgmentComponent", () => ({
  HabitAcknowledgmentComponent: () => createElement("div", { "data-mock": "habit-acknowledgment" }),
  default: () => createElement("div", { "data-mock": "habit-acknowledgment" }),
}));

import Surface from "../app/page";
import { MetricTile } from "../app/components/MetricTile";
import { DashboardHero } from "../app/components/DashboardHero";
import { VelocityPanel } from "../app/components/VelocityPanel";

async function renderSurface() {
  const tree = await Surface();
  return renderToString(tree);
}

describe("PM-1-1: metric primitives are wired into the dashboard", () => {
  it("renders one tile per primitive plus the engagement-with-engagement tile", async () => {
    const html = await renderSurface();
    expect(html).toContain(">North Star<");
    expect(html).toContain(">Engagement<");
    expect(html).toContain(">Velocity<");
    expect(html).toContain(">Features Shipped<");
    expect(html).toContain(">Sprints Shipped<");
    expect(html).toContain(">Tests Passing<");
  });

  it("renders the values returned by the primitives in the tile grid", async () => {
    const html = await renderSurface();
    expect(html).toContain("14"); // northStar
    expect(html).toContain("42"); // engagement
    expect(html).toContain("6.5"); // velocity
    expect(html).toContain("6"); // featureCount
    expect(html).toContain("1"); // sprintCount
    expect(html).toContain("100%"); // testsPassing
  });

  it("uses a responsive grid container for the tiles", async () => {
    const html = await renderSurface();
    expect(html).toContain('data-testid="tile-grid"');
    expect(html).toContain("tileGrid");
  });
});

describe("PM-1-2: north star hero sits above the tile grid", () => {
  it("renders the north star value in the hero", async () => {
    const html = await renderSurface();
    const heroIdx = html.indexOf('data-testid="north-star-value"');
    const gridIdx = html.indexOf('data-testid="tile-grid"');
    expect(heroIdx).toBeGreaterThan(-1);
    expect(gridIdx).toBeGreaterThan(-1);
    expect(heroIdx).toBeLessThan(gridIdx);
  });

  it("includes a 'North Star' label and a hardcoded descriptor sentence", async () => {
    const html = renderToString(
      createElement(DashboardHero, {
        northStarValue: 14,
        npsLiftIndex: 11.4,
        featuresShipped: 6,
      }),
    );
    expect(html).toContain("North Star");
    expect(html).toContain("primary measure of itself");
  });
});

describe("PM-1-3: engagement-with-engagement tile is distinct", () => {
  it("includes a tile labeled 'Engagement with the Engagement Dashboard'", async () => {
    const html = await renderSurface();
    expect(html).toContain("Engagement with the Engagement Dashboard");
  });

  it("applies a distinct CSS class (not inline style) for the variant", () => {
    const html = renderToString(
      createElement(MetricTile, {
        label: "Engagement with the Engagement Dashboard",
        value: 42,
        variant: "engagement",
      }),
    );
    expect(html).toContain("tileEngagement");
    expect(html).toContain('data-variant="engagement"');
    expect(html).not.toMatch(/style="[^"]*background/);
  });

  it("is distinct from the base engagement tile", async () => {
    const html = await renderSurface();
    expect(html).toContain('data-variant="engagement"');
    // base engagement tile also exists, distinct from the recursive one
    const baseLabelIdx = html.indexOf(">Engagement<");
    const recursiveLabelIdx = html.indexOf(
      ">Engagement with the Engagement Dashboard<",
    );
    expect(baseLabelIdx).toBeGreaterThan(-1);
    expect(recursiveLabelIdx).toBeGreaterThan(-1);
    expect(baseLabelIdx).not.toBe(recursiveLabelIdx);
  });
});

describe("PM-1-4: velocity panel with sprint-over-sprint momentum", () => {
  it("renders below the tile grid", async () => {
    const html = await renderSurface();
    const gridIdx = html.indexOf('data-testid="tile-grid"');
    const panelIdx = html.indexOf('aria-label="velocity panel"');
    expect(gridIdx).toBeGreaterThan(-1);
    expect(panelIdx).toBeGreaterThan(-1);
    expect(panelIdx).toBeGreaterThan(gridIdx);
  });

  it("includes the 'Velocity' heading and 'Sprint-over-Sprint Momentum' subheader", async () => {
    const html = await renderSurface();
    expect(html).toContain(">Velocity<");
    expect(html).toContain("Sprint-over-Sprint Momentum");
    expect(html).toContain("Sprint Velocity");
  });

  it("renders an upward directional indicator when delta > 0", () => {
    const html = renderToString(
      createElement(VelocityPanel, { currentVelocity: 6.5, delta: 6.5 }),
    );
    expect(html).toContain('data-direction="up"');
    expect(html).toContain("deltaUp");
    expect(html).toContain("+6.5");
  });

  it("renders a neutral directional indicator when delta = 0", () => {
    const html = renderToString(
      createElement(VelocityPanel, { currentVelocity: 0, delta: 0 }),
    );
    expect(html).toContain('data-direction="flat"');
    expect(html).toContain("deltaFlat");
  });

  it("renders a downward directional indicator when delta < 0", () => {
    const html = renderToString(
      createElement(VelocityPanel, { currentVelocity: 3, delta: -2 }),
    );
    expect(html).toContain('data-direction="down"');
    expect(html).toContain("deltaDown");
  });

  it("computes Sprint 1 delta against a Sprint 0 baseline of 0", async () => {
    const html = await renderSurface();
    // velocity=6.5, prior=0, delta=6.5
    expect(html).toContain("+6.5");
    expect(html).toContain('data-direction="up"');
  });
});

describe("PM-1-5: NPS lift index and features shipped hero numbers", () => {
  it("renders both as hero numbers in the dashboard header region", async () => {
    const html = await renderSurface();
    expect(html).toContain("NPS Lift Index");
    expect(html).toContain("Features Shipped");
    expect(html).toContain('data-testid="nps-lift-index"');
    expect(html).toContain('data-testid="features-shipped"');
  });

  it("renders nps lift and features shipped values from the primitives", async () => {
    const html = await renderSurface();
    expect(html).toContain("+11.4");
    expect(html).toContain(">6<");
  });

  it("places the secondary hero numbers inside the hero section, above the tile grid", async () => {
    const html = await renderSurface();
    const npsIdx = html.indexOf('data-testid="nps-lift-index"');
    const featIdx = html.indexOf('data-testid="features-shipped"');
    const gridIdx = html.indexOf('data-testid="tile-grid"');
    expect(npsIdx).toBeGreaterThan(-1);
    expect(featIdx).toBeGreaterThan(-1);
    expect(npsIdx).toBeLessThan(gridIdx);
    expect(featIdx).toBeLessThan(gridIdx);
  });
});

describe("PM-1-6: components are extracted and composed", () => {
  it("MetricTile renders label, value, and optional descriptor", () => {
    const html = renderToString(
      createElement(MetricTile, {
        label: "Sprints Shipped",
        value: 1,
        descriptor: "sprints shipped",
      }),
    );
    expect(html).toContain("Sprints Shipped");
    expect(html).toContain(">1<");
    expect(html).toContain("sprints shipped");
  });

  it("MetricTile omits the descriptor element when not provided", () => {
    const html = renderToString(
      createElement(MetricTile, { label: "North Star", value: 14 }),
    );
    expect(html).toContain("North Star");
    expect(html).toContain(">14<");
    expect(html).not.toContain("tileDescriptor");
  });

  it("DashboardHero accepts the three required hero values", () => {
    const html = renderToString(
      createElement(DashboardHero, {
        northStarValue: 14,
        npsLiftIndex: 11.4,
        featuresShipped: 6,
      }),
    );
    expect(html).toContain("North Star");
    expect(html).toContain("14");
    expect(html).toContain("+11.4");
    expect(html).toContain("Features Shipped");
  });

  it("VelocityPanel accepts currentVelocity and delta", () => {
    const html = renderToString(
      createElement(VelocityPanel, { currentVelocity: 6.5, delta: 6.5 }),
    );
    expect(html).toContain("6.5");
    expect(html).toContain("Sprint-over-Sprint Momentum");
  });
});
