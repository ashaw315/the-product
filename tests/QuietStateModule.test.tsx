import { describe, it, expect, vi } from "vitest";
import { renderToString } from "react-dom/server";

vi.mock("@/lib/product-metrics", () => ({
  getEngagement: async () => 7,
}));

import { QuietStateModule } from "../app/components/QuietStateModule";

async function render() {
  const tree = await QuietStateModule();
  return renderToString(tree);
}

describe("PM-4-4: QuietStateModule (Sprint 3)", () => {
  it("renders without throwing", async () => {
    await expect(render()).resolves.toBeTruthy();
  });

  it("renders mocked engagement value in output", async () => {
    const html = await render();
    expect(html).toContain("7");
  });

  it("renders with the quiet-state-module test id", async () => {
    const html = await render();
    expect(html).toContain('data-testid="quiet-state-module"');
  });
});
