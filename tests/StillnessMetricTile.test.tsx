import { describe, it, expect } from "vitest";
import { renderToString } from "react-dom/server";
import { createElement } from "react";
import { StillnessMetricTile } from "../app/components/StillnessMetricTile";

describe("StillnessMetricTile (PM-8-1)", () => {
  it("renders the label", () => {
    const html = renderToString(
      createElement(StillnessMetricTile, { label: "North Star", value: 42 }),
    );
    expect(html).toContain("North Star");
  });

  it("renders a numeric value", () => {
    const html = renderToString(
      createElement(StillnessMetricTile, { label: "Engagement", value: 42 }),
    );
    expect(html).toContain("42");
  });

  it("renders a string value", () => {
    const html = renderToString(
      createElement(StillnessMetricTile, {
        label: "Tests Passing",
        value: "100%",
      }),
    );
    expect(html).toContain("100%");
  });

  it("renders with data-testid attribute", () => {
    const html = renderToString(
      createElement(StillnessMetricTile, { label: "Velocity", value: 6.5 }),
    );
    expect(html).toContain('data-testid="stillness-metric-tile"');
  });

  it("applies label class to the label element", () => {
    const html = renderToString(
      createElement(StillnessMetricTile, { label: "Sprints", value: 1 }),
    );
    expect(html).toContain('class="label"');
  });

  it("applies mono class to the value element", () => {
    const html = renderToString(
      createElement(StillnessMetricTile, { label: "Features", value: 6 }),
    );
    expect(html).toContain('class="mono"');
  });
});
