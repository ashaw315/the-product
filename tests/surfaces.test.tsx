import { describe, it, expect, vi } from "vitest";
import { renderToString } from "react-dom/server";

vi.mock("@/lib/product-metrics", () => ({
  getAllMetrics: async () => ({
    sprintCount: 4,
    featureCount: 20,
    velocity: 5.0,
    engagement: 100,
    northStar: 105,
    testsPassing: 100,
    npsLiftIndex: 11.4,
  }),
}));

import SurfacesPage from "../app/surfaces/page";

async function renderPage() {
  const element = await SurfacesPage();
  return renderToString(element);
}

describe("PM-5-2: Navigable Surface Index at /surfaces", () => {
  it("renders the heading identifying it as the navigable surface index", async () => {
    const html = await renderPage();
    expect(html).toContain("navigable surface index");
  });

  it("renders the self-referential /surfaces entry linking to /surfaces", async () => {
    const html = await renderPage();
    expect(html).toContain('href="/surfaces"');
  });

  it("renders at least one other surface entry", async () => {
    const html = await renderPage();
    expect(html).toContain('href="/"');
    expect(html).toContain('href="/engagement"');
  });

  it("renders a live metrics summary using values from getAllMetrics", async () => {
    const html = await renderPage();
    expect(html).toContain("20"); // featureCount
    expect(html).toContain("4"); // sprintCount
    expect(html).toContain("105"); // northStar
  });

  it("renders at least six named component modalities from sprint history", async () => {
    const html = await renderPage();
    expect(html).toContain("North Star Hero");
    expect(html).toContain("Velocity Panel");
    expect(html).toContain("Guided Orientation Banner");
    expect(html).toContain("Return Beacon");
    expect(html).toContain("Anticipation Layer");
    expect(html).toContain("Depth Indicator");
    expect(html).toContain("Discovery Ribbon");
  });
});
