import { describe, it, expect, vi } from "vitest";
import { renderToString } from "react-dom/server";

vi.mock("@/lib/product-metrics", () => ({
  getAllMetrics: async () => ({
    sprintCount: 3,
    featureCount: 12,
    velocity: 4.5,
    engagement: 28,
    northStar: 52,
    testsPassing: 100,
    npsLiftIndex: 11.4,
  }),
}));

import SprintReflection from "../app/reflection/page";

async function render() {
  const tree = await SprintReflection();
  return renderToString(tree);
}

describe("PM-4-4: SprintReflection page (Sprint 3)", () => {
  it("renders without throwing", async () => {
    await expect(render()).resolves.toBeTruthy();
  });

  it("renders a non-empty narrative string", async () => {
    const html = await render();
    expect(html.trim().length).toBeGreaterThan(0);
    expect(html).toContain('data-testid="sprint-reflection"');
  });

  it("incorporates sprint count in the narrative", async () => {
    const html = await render();
    expect(html).toContain("3");
  });

  it("incorporates feature count in the narrative", async () => {
    const html = await render();
    expect(html).toContain("12");
  });

  it("incorporates velocity in the narrative", async () => {
    const html = await render();
    expect(html).toContain("4.5");
  });
});
