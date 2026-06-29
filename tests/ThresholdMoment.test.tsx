import { describe, it, expect, vi } from "vitest";
import { renderToString } from "react-dom/server";

vi.mock("@/lib/product-metrics", () => ({
  getVelocity: async () => 6.5,
  getFeatureCount: async () => 6,
  getNPSLiftIndex: () => 11.4,
}));

import ThresholdMoment from "../app/components/ThresholdMoment";

describe("PM-7-2: ThresholdMoment", () => {
  it("renders without error", async () => {
    const el = await ThresholdMoment();
    const html = renderToString(el);
    expect(html).toBeTruthy();
  });

  it("renders the velocity value", async () => {
    const el = await ThresholdMoment();
    const html = renderToString(el);
    expect(html).toContain("6.5");
  });

  it("renders the feature count value", async () => {
    const el = await ThresholdMoment();
    const html = renderToString(el);
    expect(html).toContain(">6<");
  });

  it("renders the NPS lift index value", async () => {
    const el = await ThresholdMoment();
    const html = renderToString(el);
    expect(html).toContain("11.4");
  });
});
