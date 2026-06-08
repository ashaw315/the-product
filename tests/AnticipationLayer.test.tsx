import { describe, it, expect, vi } from "vitest";
import { renderToString } from "react-dom/server";

vi.mock("@/lib/product-metrics", () => ({
  getVelocity: async () => 5.5,
  getFeatureCount: async () => 8,
}));

import { AnticipationLayer } from "../app/components/AnticipationLayer";

async function render() {
  const tree = await AnticipationLayer();
  return renderToString(tree);
}

describe("PM-4-2: AnticipationLayer", () => {
  it("renders without throwing when both functions return numeric values", async () => {
    await expect(render()).resolves.toBeTruthy();
  });

  it("renders a non-empty string incorporating the velocity value", async () => {
    const html = await render();
    expect(html.length).toBeGreaterThan(0);
    expect(html).toContain("5.5");
  });

  it("renders a non-empty string incorporating the feature count value", async () => {
    const html = await render();
    expect(html).toContain("8");
  });

  it("renders forward-facing copy framed around becoming", async () => {
    const html = await render();
    expect(html).toContain("becoming");
  });

  it("renders with the anticipation-layer test id", async () => {
    const html = await render();
    expect(html).toContain('data-testid="anticipation-layer"');
  });
});
