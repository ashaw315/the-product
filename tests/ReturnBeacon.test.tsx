import { describe, it, expect, vi } from "vitest";
import { renderToString } from "react-dom/server";

vi.mock("@/lib/product-metrics", () => ({
  getEngagement: async () => 42,
  getSprintCount: async () => 3,
}));

import { ReturnBeacon } from "../app/components/ReturnBeacon";

async function render() {
  const tree = await ReturnBeacon();
  return renderToString(tree);
}

describe("PM-4-1: ReturnBeacon", () => {
  it("renders without throwing when both functions return numeric values", async () => {
    await expect(render()).resolves.toBeTruthy();
  });

  it("renders a non-empty string incorporating the engagement value", async () => {
    const html = await render();
    expect(html.length).toBeGreaterThan(0);
    expect(html).toContain("42");
  });

  it("renders a non-empty string incorporating the sprint count value", async () => {
    const html = await render();
    expect(html).toContain("3");
  });

  it("renders with the return-beacon test id", async () => {
    const html = await render();
    expect(html).toContain('data-testid="return-beacon"');
  });
});
