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

import OrientationModule from "../app/orientation/page";

describe("PM-7-3: Orientation Module page at /orientation", () => {
  it("renders without error", async () => {
    const el = await OrientationModule();
    const html = renderToString(el);
    expect(html).toBeTruthy();
  });

  it("renders all four route links", async () => {
    const el = await OrientationModule();
    const html = renderToString(el);
    expect(html).toContain('href="/engagement"');
    expect(html).toContain('href="/presence"');
    expect(html).toContain('href="/surfaces"');
    expect(html).toContain('href="/reflection"');
  });

  it("renders the north star metric value", async () => {
    const el = await OrientationModule();
    const html = renderToString(el);
    expect(html).toContain("56");
  });

  it("renders the sprint count value", async () => {
    const el = await OrientationModule();
    const html = renderToString(el);
    expect(html).toContain("7");
  });

  it("renders the velocity value", async () => {
    const el = await OrientationModule();
    const html = renderToString(el);
    expect(html).toContain("6.5");
  });
});
