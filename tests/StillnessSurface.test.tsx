import { describe, it, expect } from "vitest";
import { renderToString } from "react-dom/server";
import { createElement } from "react";
import { StillnessSurface } from "../app/components/StillnessSurface";

const DEFAULT_PROPS = {
  northStar: 14,
  engagement: 42,
  velocity: 6.5,
  featureCount: 6,
  sprintCount: 1,
  testsPassing: 100,
};

describe("StillnessSurface (PM-8-1)", () => {
  it("renders all six metric tile labels", () => {
    const html = renderToString(createElement(StillnessSurface, DEFAULT_PROPS));
    expect(html).toContain("North Star");
    expect(html).toContain("Engagement");
    expect(html).toContain("Velocity");
    expect(html).toContain("Features");
    expect(html).toContain("Sprints");
    expect(html).toContain("Tests Passing");
  });

  it("renders all six metric values", () => {
    const html = renderToString(createElement(StillnessSurface, DEFAULT_PROPS));
    expect(html).toContain("14");
    expect(html).toContain("42");
    expect(html).toContain("6.5");
    expect(html).toContain("6");
    expect(html).toContain("1");
    expect(html).toContain("100%");
  });

  it("renders with data-testid attribute", () => {
    const html = renderToString(createElement(StillnessSurface, DEFAULT_PROPS));
    expect(html).toContain('data-testid="stillness-surface"');
  });

  it("renders with the aria-label attribute", () => {
    const html = renderToString(createElement(StillnessSurface, DEFAULT_PROPS));
    expect(html).toContain('aria-label="stillness surface"');
  });

  it("renders six stillness-metric-tile instances", () => {
    const html = renderToString(createElement(StillnessSurface, DEFAULT_PROPS));
    const tileCount = (
      html.match(/data-testid="stillness-metric-tile"/g) ?? []
    ).length;
    expect(tileCount).toBe(6);
  });

  it("appends % to testsPassing value", () => {
    const html = renderToString(
      createElement(StillnessSurface, { ...DEFAULT_PROPS, testsPassing: 100 }),
    );
    expect(html).toContain("100%");
  });
});
