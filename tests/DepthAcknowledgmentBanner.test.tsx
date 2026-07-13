import { describe, it, expect, vi } from "vitest";
import { renderToString } from "react-dom/server";
import { createElement } from "react";

vi.mock("@/lib/product-metrics", () => ({
  getUser: () => ({ id: "the-user", name: "the user", plan: "the plan" }),
  getAllMetrics: async () => ({
    sprintCount: 9,
    featureCount: 6,
    velocity: 6.5,
    engagement: 42,
    northStar: 100,
    testsPassing: 100,
    npsLiftIndex: 11.4,
  }),
}));

import { DepthAcknowledgmentBanner } from "../app/components/DepthAcknowledgmentBanner";
import Surface from "../app/page";

describe("PM-9-3: DepthAcknowledgmentBanner component", () => {
  it("renders with mocked props without error", () => {
    const html = renderToString(
      createElement(DepthAcknowledgmentBanner, { northStar: 100, sprintCount: 9 }),
    );
    expect(html).toBeTruthy();
  });

  it("headline contains sprintCount value", () => {
    const html = renderToString(
      createElement(DepthAcknowledgmentBanner, { northStar: 100, sprintCount: 9 }),
    );
    expect(html).toContain("9");
  });

  it("headline contains 'depth' or 'sprints'", () => {
    const html = renderToString(
      createElement(DepthAcknowledgmentBanner, { northStar: 100, sprintCount: 9 }),
    );
    expect(html.toLowerCase()).toMatch(/depth|sprints/);
  });

  it("subline contains return-oriented language", () => {
    const html = renderToString(
      createElement(DepthAcknowledgmentBanner, { northStar: 100, sprintCount: 9 }),
    );
    expect(html.toLowerCase()).toMatch(/returning|back/);
  });
});

describe("PM-9-3: DepthAcknowledgmentBanner dashboard integration", () => {
  it("does not replace or remove Return Acknowledgment Signal — both coexist in dashboard", async () => {
    const tree = await Surface();
    const html = renderToString(tree);
    expect(html).toContain('data-testid="depth-acknowledgment-banner"');
    expect(html).toContain('data-testid="return-acknowledgment-signal"');
  });

  it("DepthAcknowledgmentBanner appears before ReturnAcknowledgmentSignal in markup", async () => {
    const tree = await Surface();
    const html = renderToString(tree);
    const bannerIdx = html.indexOf('data-testid="depth-acknowledgment-banner"');
    const signalIdx = html.indexOf('data-testid="return-acknowledgment-signal"');
    expect(bannerIdx).toBeGreaterThan(-1);
    expect(signalIdx).toBeGreaterThan(-1);
    expect(bannerIdx).toBeLessThan(signalIdx);
  });
});
