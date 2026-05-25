import { describe, it, expect, vi } from "vitest";
import { renderToString } from "react-dom/server";
import { createElement } from "react";

vi.mock("@/lib/product-metrics", () => ({
  getNorthStar: async () => 14,
  getEngagement: async () => 42,
  getFeatureCount: async () => 6,
  getSprintCount: async () => 1,
  getTestsPassing: async () => 100,
  getVelocity: async () => 6.5,
  getNPSLiftIndex: () => 11.4,
  getUser: () => ({ id: "the-user", name: "the user", plan: "the plan" }),
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

import { DashboardHero } from "../app/components/DashboardHero";

describe("PM-2-6 / PM-2-4: NorthStarHero", () => {
  it("renders the mocked getNorthStar value", () => {
    const html = renderToString(
      createElement(DashboardHero, {
        northStarValue: 14,
        npsLiftIndex: 11.4,
        featuresShipped: 6,
      }),
    );
    expect(html).toContain("14");
  });

  it("renders the 'North Star' label", () => {
    const html = renderToString(
      createElement(DashboardHero, {
        northStarValue: 14,
        npsLiftIndex: 11.4,
        featuresShipped: 6,
      }),
    );
    expect(html).toContain("North Star");
  });

  it("renders the descriptor sentence about primary measure", () => {
    const html = renderToString(
      createElement(DashboardHero, {
        northStarValue: 14,
        npsLiftIndex: 11.4,
        featuresShipped: 6,
      }),
    );
    expect(html).toContain("primary measure of itself");
  });

  it("PM-2-4: MetricTile wrapper is present in the rendered output", () => {
    const html = renderToString(
      createElement(DashboardHero, {
        northStarValue: 14,
        npsLiftIndex: 11.4,
        featuresShipped: 6,
      }),
    );
    expect(html).toContain('data-testid="metric-tile"');
  });
});
