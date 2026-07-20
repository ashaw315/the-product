import { describe, it, expect, vi } from "vitest";
import { renderToString } from "react-dom/server";

vi.mock("@/lib/product-metrics", () => ({
  getEngagement: async () => 42,
  getSprintCount: async () => 1,
  getNorthStar: async () => 14,
}));

import ReturnSignalAccumulator from "../app/returns/page";

describe("PM-10-5: ReturnSignalAccumulator page at /returns", () => {
  it("renders without error", async () => {
    const html = renderToString(await ReturnSignalAccumulator());
    expect(html).toBeTruthy();
  });

  it("renders the engagement metric value", async () => {
    const html = renderToString(await ReturnSignalAccumulator());
    expect(html).toContain('data-testid="engagement-value"');
    expect(html).toContain(">42<");
  });

  it("renders the sprint count metric value", async () => {
    const html = renderToString(await ReturnSignalAccumulator());
    expect(html).toContain('data-testid="sprint-count-value"');
    expect(html).toContain(">1<");
  });

  it("renders the north star metric value", async () => {
    const html = renderToString(await ReturnSignalAccumulator());
    expect(html).toContain('data-testid="north-star-value"');
    expect(html).toContain(">14<");
  });

  it("renders the return metrics section", async () => {
    const html = renderToString(await ReturnSignalAccumulator());
    expect(html).toContain('data-testid="return-metrics"');
  });

  it("renders the /returns route label", async () => {
    const html = renderToString(await ReturnSignalAccumulator());
    expect(html).toContain("/returns");
  });
});
