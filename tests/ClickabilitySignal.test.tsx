import { describe, it, expect, vi } from "vitest";
import { renderToString } from "react-dom/server";

vi.mock("@/lib/product-metrics", () => ({
  getFeatureCount: async () => 6,
  getVelocity: async () => 6.5,
}));

import { ClickabilitySignal } from "../app/components/ClickabilitySignal";

describe("PM-10-4: ClickabilitySignal", () => {
  it("renders without error", async () => {
    const html = renderToString(await ClickabilitySignal());
    expect(html).toBeTruthy();
  });

  it("renders the feature count value", async () => {
    const html = renderToString(await ClickabilitySignal());
    expect(html).toContain('data-testid="feature-count"');
    expect(html).toContain(">6<");
  });

  it("renders the velocity value", async () => {
    const html = renderToString(await ClickabilitySignal());
    expect(html).toContain('data-testid="velocity-value"');
    expect(html).toContain("6.5");
  });

  it("renders a declarative statement referencing the feature count", async () => {
    const html = renderToString(await ClickabilitySignal());
    expect(html).toContain("always growing");
  });

  it("applies a CSS animation class to the feature count", async () => {
    const html = renderToString(await ClickabilitySignal());
    expect(html).toContain("pulse");
  });
});
