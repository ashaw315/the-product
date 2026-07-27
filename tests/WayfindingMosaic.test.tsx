import { describe, it, expect, vi } from "vitest";
import { renderToString } from "react-dom/server";

vi.mock("@/lib/product-metrics", () => ({
  getAllMetrics: async () => ({
    sprintCount: 11,
    featureCount: 7,
    velocity: 6.5,
    engagement: 42,
    northStar: 96,
    testsPassing: 100,
    npsLiftIndex: 11.4,
  }),
}));

import WayfindingMosaic from "../app/wayfinding/page";

describe("PM-11-4: WayfindingMosaic page", () => {
  it("renders without crashing", async () => {
    const tree = await WayfindingMosaic();
    const html = renderToString(tree);
    expect(html).toBeTruthy();
  });

  it("renders the page-level heading", async () => {
    const tree = await WayfindingMosaic();
    const html = renderToString(tree);
    expect(html).toContain("Wayfinding");
    expect(html).toContain('data-testid="wayfinding-heading"');
  });

  it("renders metric values from the primitives", async () => {
    const tree = await WayfindingMosaic();
    const html = renderToString(tree);
    expect(html).toContain("11");
    expect(html).toContain("7");
    expect(html).toContain("96");
  });
});
