import { describe, it, expect, vi } from "vitest";
import { renderToString } from "react-dom/server";

vi.mock("@/lib/product-metrics", () => ({
  getEngagement: async () => 42,
  getNorthStar: async () => 14,
}));

import { LatentEngagementIndicator } from "../app/components/LatentEngagementIndicator";

describe("PM-10-5: LatentEngagementIndicator component", () => {
  it("renders without error", async () => {
    const html = renderToString(await LatentEngagementIndicator());
    expect(html).toBeTruthy();
  });

  it("renders the engagement metric value", async () => {
    const html = renderToString(await LatentEngagementIndicator());
    expect(html).toContain('data-testid="engagement-value"');
    expect(html).toContain(">42<");
  });

  it("renders the north star metric value", async () => {
    const html = renderToString(await LatentEngagementIndicator());
    expect(html).toContain('data-testid="north-star-value"');
    expect(html).toContain(">14<");
  });

  it("renders the latent ratio", async () => {
    const html = renderToString(await LatentEngagementIndicator());
    expect(html).toContain('data-testid="latent-ratio"');
    // 42 / 14 = 3.00
    expect(html).toContain("3.00");
  });

  it("renders the latent engagement indicator section", async () => {
    const html = renderToString(await LatentEngagementIndicator());
    expect(html).toContain('data-testid="latent-engagement-indicator"');
  });
});
