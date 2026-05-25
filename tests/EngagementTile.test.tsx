import { describe, it, expect } from "vitest";
import { renderToString } from "react-dom/server";
import { createElement } from "react";
import { MetricTile } from "../app/components/MetricTile";

describe("PM-2-6: EngagementTile", () => {
  it("renders the mocked getEngagement value", () => {
    const html = renderToString(
      createElement(MetricTile, {
        label: "Engagement",
        value: 42,
        descriptor: "dashboard hits",
      }),
    );
    expect(html).toContain("42");
  });

  it("renders without error when value is 0", () => {
    const html = renderToString(
      createElement(MetricTile, {
        label: "Engagement",
        value: 0,
        descriptor: "dashboard hits",
      }),
    );
    expect(html).toContain("Engagement");
    expect(html).toContain("0");
  });

  it("renders the engagement variant class for the meta tile", () => {
    const html = renderToString(
      createElement(MetricTile, {
        label: "Engagement with the Engagement Dashboard",
        value: 42,
        variant: "engagement",
      }),
    );
    expect(html).toContain("tileEngagement");
    expect(html).toContain('data-variant="engagement"');
  });
});
