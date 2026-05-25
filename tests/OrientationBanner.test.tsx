import { describe, it, expect, vi } from "vitest";
import { renderToString } from "react-dom/server";

vi.mock("@/lib/product-metrics", () => ({
  getFeatureCount: async () => 6,
  getSprintCount: async () => 2,
}));

import { OrientationBanner } from "../app/components/OrientationBanner";

describe("PM-2-1: OrientationBanner", () => {
  it("renders the full orientation copy", async () => {
    const tree = await OrientationBanner();
    const html = renderToString(tree);
    expect(html).toContain("The product is the product");
    expect(html).toContain("You are here");
  });

  it("includes the live featureCount value", async () => {
    const tree = await OrientationBanner();
    const html = renderToString(tree);
    expect(html).toContain("6");
  });

  it("includes the live sprintCount value", async () => {
    const tree = await OrientationBanner();
    const html = renderToString(tree);
    expect(html).toContain("2");
  });

  it("renders with data-testid for identification", async () => {
    const tree = await OrientationBanner();
    const html = renderToString(tree);
    expect(html).toContain('data-testid="orientation-banner"');
  });
});
