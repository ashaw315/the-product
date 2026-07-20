import { describe, it, expect, vi } from "vitest";
import { renderToString } from "react-dom/server";

vi.mock("@/lib/product-metrics", () => ({
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

import WayfindingMosaic from "../app/wayfinding/page";

describe("PM-10-2: WayfindingMosaic page", () => {
  it("renders without error", async () => {
    const html = renderToString(await WayfindingMosaic());
    expect(html).toBeTruthy();
  });

  it("renders the Wayfinding Mosaic heading", async () => {
    const html = renderToString(await WayfindingMosaic());
    expect(html).toContain("Wayfinding Mosaic");
    expect(html).toContain('data-testid="wayfinding-heading"');
  });

  it("renders a tile for each of the eight product routes", async () => {
    const html = renderToString(await WayfindingMosaic());
    expect(html).toContain('data-testid="tile-home"');
    expect(html).toContain('data-testid="tile-engagement"');
    expect(html).toContain('data-testid="tile-stillness"');
    expect(html).toContain('data-testid="tile-returns"');
    expect(html).toContain('data-testid="tile-presence"');
    expect(html).toContain('data-testid="tile-surfaces"');
    expect(html).toContain('data-testid="tile-orientation"');
    expect(html).toContain('data-testid="tile-reflection"');
  });

  it("renders route paths in the mosaic", async () => {
    const html = renderToString(await WayfindingMosaic());
    expect(html).toContain(">/</");
    expect(html).toContain(">/engagement<");
    expect(html).toContain(">/stillness<");
    expect(html).toContain(">/returns<");
  });

  it("renders live metric values from getAllMetrics", async () => {
    const html = renderToString(await WayfindingMosaic());
    // northStar=14 used for /, /stillness, /orientation
    expect(html).toContain(">14<");
    // engagement=42 used for /engagement
    expect(html).toContain(">42<");
    // sprintCount=1 used for /returns, /reflection
    expect(html).toContain(">1<");
    // featureCount=6 used for /presence, /surfaces
    expect(html).toContain(">6<");
  });

  it("renders a route mosaic section", async () => {
    const html = renderToString(await WayfindingMosaic());
    expect(html).toContain('data-testid="route-mosaic"');
  });
});
