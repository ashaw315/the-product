import { describe, it, expect, vi } from "vitest";
import { renderToString } from "react-dom/server";

vi.mock("@/lib/product-metrics", () => ({
  getFeatureCount: async () => 6,
  getSprintCount: async () => 1,
}));

import { ActionInvitationLayer } from "../app/components/ActionInvitationLayer";

describe("PM-10-1: ActionInvitationLayer", () => {
  it("renders without error", async () => {
    const html = renderToString(await ActionInvitationLayer());
    expect(html).toBeTruthy();
  });

  it("renders links for all eight product routes", async () => {
    const html = renderToString(await ActionInvitationLayer());
    expect(html).toContain('href="/engagement"');
    expect(html).toContain('href="/stillness"');
    expect(html).toContain('href="/returns"');
    expect(html).toContain('href="/presence"');
    expect(html).toContain('href="/surfaces"');
    expect(html).toContain('href="/orientation"');
    expect(html).toContain('href="/reflection"');
    expect(html).toContain('href="/wayfinding"');
  });

  it("renders the feature count value", async () => {
    const html = renderToString(await ActionInvitationLayer());
    expect(html).toContain('data-testid="feature-count"');
    expect(html).toContain(">6<");
  });

  it("renders the sprint count value", async () => {
    const html = renderToString(await ActionInvitationLayer());
    expect(html).toContain('data-testid="sprint-count"');
    expect(html).toContain(">1<");
  });

  it("renders a one-line descriptor for each route", async () => {
    const html = renderToString(await ActionInvitationLayer());
    expect(html).toContain("Engage with engagement itself.");
    expect(html).toContain("Every return is a signal.");
    expect(html).toContain("The full map of everywhere the product exists.");
  });

  it("wraps links in a nav for keyboard accessibility", async () => {
    const html = renderToString(await ActionInvitationLayer());
    expect(html).toContain('aria-label="product routes"');
  });
});
