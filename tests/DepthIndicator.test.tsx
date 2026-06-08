import { describe, it, expect, vi } from "vitest";
import { renderToString } from "react-dom/server";

vi.mock("@/lib/product-metrics", () => ({
  getSprintCount: async () => 4,
}));

import { DepthIndicator } from "../app/components/DepthIndicator";

async function render() {
  const tree = await DepthIndicator();
  return renderToString(tree);
}

describe("PM-4-4: DepthIndicator (Sprint 3)", () => {
  it("renders without throwing", async () => {
    await expect(render()).resolves.toBeTruthy();
  });

  it("renders in persistent below-fold posture — present in DOM", async () => {
    const html = await render();
    expect(html).toContain('data-testid="depth-indicator"');
  });

  it("renders mocked sprint count value in output", async () => {
    const html = await render();
    expect(html).toContain("4");
  });
});
