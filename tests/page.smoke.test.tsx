import { describe, it, expect, vi } from "vitest";
import { renderToString } from "react-dom/server";
import { createElement } from "react";

vi.mock("@/lib/product-metrics", () => ({
  getUser: () => ({ id: "the-user", name: "the user", plan: "the plan" }),
  getNorthStar: async () => 42,
  getEngagement: async () => 99,
  getVelocity: async () => 6.5,
  getFeatureCount: async () => 7,
  getSprintCount: async () => 11,
  getTestsPassing: async () => 100,
  getNPSLiftIndex: () => 11.4,
  getAllMetrics: async () => ({
    sprintCount: 11,
    featureCount: 7,
    velocity: 6.5,
    engagement: 99,
    northStar: 42,
    testsPassing: 100,
    npsLiftIndex: 11.4,
  }),
}));

// Mock async sub-components so renderToString can handle the full page tree.
vi.mock("../app/components/DepthAcknowledgmentBanner", () => ({
  DepthAcknowledgmentBanner: () => createElement("div", { "data-mock": "depth-banner", className: "depth-banner--quieted" }),
  default: () => createElement("div", { "data-mock": "depth-banner", className: "depth-banner--quieted" }),
}));
vi.mock("../app/components/ActionInvitationLayer", () => ({
  ActionInvitationLayer: () => createElement("div", { "data-mock": "action-invitation-layer", "aria-label": "action invitation layer" }),
  default: () => createElement("div", { "data-mock": "action-invitation-layer", "aria-label": "action invitation layer" }),
}));
vi.mock("../app/components/ClickabilitySignal", () => ({
  ClickabilitySignal: () => createElement("div", { "data-mock": "clickability-signal", "aria-label": "clickability signal" }),
  default: () => createElement("div", { "data-mock": "clickability-signal", "aria-label": "clickability signal" }),
}));
vi.mock("../app/components/HabitAcknowledgmentComponent", () => ({
  HabitAcknowledgmentComponent: () => createElement("div", { "data-mock": "habit-acknowledgment", "aria-label": "habit acknowledgment" }),
  default: () => createElement("div", { "data-mock": "habit-acknowledgment", "aria-label": "habit acknowledgment" }),
}));

import Surface from "../app/page";

async function renderSurface() {
  const tree = await Surface();
  return renderToString(tree);
}

describe("PM-11-4: dashboard page smoke test", () => {
  it("renders without prop errors or crashes", async () => {
    const html = await renderSurface();
    expect(html).toBeTruthy();
  });

  it("renders all above-fold components without errors", async () => {
    const html = await renderSurface();
    expect(html).toContain("welcome back");
    expect(html).toContain('data-testid="north-star-value"');
    expect(html).toContain('href="/arrival"');
    expect(html).toContain('data-testid="tile-grid"');
  });

  it("renders all below-fold components without errors", async () => {
    const html = await renderSurface();
    expect(html).toContain('aria-label="velocity panel"');
    expect(html).toContain("depth-banner--quieted");
    expect(html).toContain('aria-label="action invitation layer"');
    expect(html).toContain('aria-label="clickability signal"');
    expect(html).toContain('aria-label="habit acknowledgment"');
  });
});
