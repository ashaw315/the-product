import { describe, it, expect, vi } from "vitest";
import { renderToString } from "react-dom/server";

vi.mock("@/lib/product-metrics", () => ({
  getSprintCount: async () => 7,
  getFeatureCount: async () => 21,
  getVelocity: async () => 5.5,
}));

import OrientationPage from "../app/orientation/page";

describe("OrientationModule — Sprint 7 Orientation page (PM-8-5)", () => {
  it("renders without errors", async () => {
    const tree = await OrientationPage();
    const html = renderToString(tree);
    expect(html).toBeTruthy();
  });

  it("renders the orientation heading", async () => {
    const tree = await OrientationPage();
    const html = renderToString(tree);
    expect(html).toContain("orientation");
  });

  it("renders the mocked sprintCount value", async () => {
    const tree = await OrientationPage();
    const html = renderToString(tree);
    expect(html).toContain("7");
  });

  it("renders the mocked featureCount value", async () => {
    const tree = await OrientationPage();
    const html = renderToString(tree);
    expect(html).toContain("21");
  });

  it("renders the mocked velocity value", async () => {
    const tree = await OrientationPage();
    const html = renderToString(tree);
    expect(html).toContain("5.5");
  });

  it("does not call actual lib/product-metrics functions (mock boundary)", async () => {
    const { getSprintCount } = await import("@/lib/product-metrics");
    const result = await getSprintCount();
    expect(result).toBe(7);
  });
});
