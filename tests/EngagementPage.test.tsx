import { describe, it, expect, vi } from "vitest";
import { renderToString } from "react-dom/server";

vi.mock("@/lib/product-metrics", () => ({
  getEngagement: async () => 42,
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

import EngagementPage from "../app/engagement/page";

describe("PM-2-5: EngagementPage", () => {
  it("renders the hero engagement value", async () => {
    const tree = await EngagementPage();
    const html = renderToString(tree);
    expect(html).toContain('data-testid="engagement-hero-value"');
    expect(html).toContain("42");
  });

  it("renders the contextual description copy", async () => {
    const tree = await EngagementPage();
    const html = renderToString(tree);
    expect(html).toContain(
      "Engagement measures the degree to which the product is engaged with",
    );
    expect(html).toContain("engagement coefficient");
  });

  it("renders the page label", async () => {
    const tree = await EngagementPage();
    const html = renderToString(tree);
    expect(html).toContain("Engagement with the Engagement Dashboard");
  });

  it("renders a link back to the dashboard", async () => {
    const tree = await EngagementPage();
    const html = renderToString(tree);
    expect(html).toContain('href="/"');
    expect(html).toContain("back to dashboard");
  });
});
