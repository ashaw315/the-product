import { describe, it, expect, vi } from "vitest";
import { renderToString } from "react-dom/server";

vi.mock("@/lib/product-metrics", () => ({
  getSprintCount: async () => 11,
}));

import { ClickabilitySignal } from "../app/components/ClickabilitySignal";

describe("PM-11-4: ClickabilitySignal", () => {
  it("renders without crashing", async () => {
    const tree = await ClickabilitySignal();
    const html = renderToString(tree);
    expect(html).toBeTruthy();
  });

  it("renders expected structural elements", async () => {
    const tree = await ClickabilitySignal();
    const html = renderToString(tree);
    expect(html).toContain('aria-label="clickability signal"');
  });

  it("renders the sprint count metric value", async () => {
    const tree = await ClickabilitySignal();
    const html = renderToString(tree);
    expect(html).toContain("11");
  });

  it("renders a navigable link", async () => {
    const tree = await ClickabilitySignal();
    const html = renderToString(tree);
    expect(html).toContain("<a");
    expect(html).toContain("href=");
  });
});
