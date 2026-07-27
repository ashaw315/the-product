import { describe, it, expect, vi } from "vitest";
import { renderToString } from "react-dom/server";

vi.mock("@/lib/product-metrics", () => ({
  getFeatureCount: async () => 7,
}));

import { DepthAcknowledgmentBanner } from "../app/components/DepthAcknowledgmentBanner";

describe("PM-11-3: DepthAcknowledgmentBanner", () => {
  it("renders without crashing", async () => {
    const tree = await DepthAcknowledgmentBanner();
    const html = renderToString(tree);
    expect(html).toBeTruthy();
  });

  it("has 'depth-banner--quieted' class on the root element", async () => {
    const tree = await DepthAcknowledgmentBanner();
    const html = renderToString(tree);
    expect(html).toContain("depth-banner--quieted");
  });

  it("renders the feature count value", async () => {
    const tree = await DepthAcknowledgmentBanner();
    const html = renderToString(tree);
    expect(html).toContain("7");
  });

  it("preserves the existing CTA link", async () => {
    const tree = await DepthAcknowledgmentBanner();
    const html = renderToString(tree);
    expect(html).toContain("<a");
    expect(html).toContain('href=');
  });
});
