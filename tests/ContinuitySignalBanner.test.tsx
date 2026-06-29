import { describe, it, expect, vi } from "vitest";
import { renderToString } from "react-dom/server";

vi.mock("@/lib/product-metrics", () => ({
  getSprintCount: async () => 7,
  getNorthStar: async () => 56,
}));

import ContinuitySignalBanner from "../app/components/ContinuitySignalBanner";

describe("PM-7-1: ContinuitySignalBanner", () => {
  it("renders without error", async () => {
    const el = await ContinuitySignalBanner();
    const html = renderToString(el);
    expect(html).toBeTruthy();
  });

  it("renders the sprint count value", async () => {
    const el = await ContinuitySignalBanner();
    const html = renderToString(el);
    expect(html).toContain("7");
  });

  it("renders the north star value", async () => {
    const el = await ContinuitySignalBanner();
    const html = renderToString(el);
    expect(html).toContain("56");
  });
});
