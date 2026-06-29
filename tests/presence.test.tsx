import { describe, it, expect, vi } from "vitest";
import { renderToString } from "react-dom/server";

vi.mock("@/lib/product-metrics", () => ({
  getAllMetrics: async () => ({
    sprintCount: 7,
    featureCount: 6,
    velocity: 6.5,
    engagement: 42,
    northStar: 56,
    testsPassing: 100,
    npsLiftIndex: 11.4,
  }),
}));

import ReturnDepthView from "../app/presence/page";

describe("PM-7-6: Return Depth View at /presence", () => {
  it("renders without error", async () => {
    const el = await ReturnDepthView();
    const html = renderToString(el);
    expect(html).toBeTruthy();
  });

  it("renders at least one metric value in output", async () => {
    const el = await ReturnDepthView();
    const html = renderToString(el);
    expect(html).toContain("42");
  });

  it("renders the engagement value", async () => {
    const el = await ReturnDepthView();
    const html = renderToString(el);
    expect(html).toContain('data-testid="return-depth-engagement"');
    expect(html).toContain("42");
  });
});
