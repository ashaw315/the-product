import { describe, it, expect } from "vitest";
import { renderToString } from "react-dom/server";
import { createElement } from "react";
import { DashboardHero } from "../app/components/DashboardHero";

describe("PM-2-6: NPSLiftHero", () => {
  it("renders the mocked getNPSLiftIndex value", () => {
    const html = renderToString(
      createElement(DashboardHero, {
        northStarValue: 14,
        npsLiftIndex: 11.4,
        featuresShipped: 6,
      }),
    );
    expect(html).toContain("+11.4");
    expect(html).toContain('data-testid="nps-lift-index"');
  });

  it("renders the NPS Lift Index label", () => {
    const html = renderToString(
      createElement(DashboardHero, {
        northStarValue: 14,
        npsLiftIndex: 11.4,
        featuresShipped: 6,
      }),
    );
    expect(html).toContain("NPS Lift Index");
  });

  it("renders Features Shipped label and value", () => {
    const html = renderToString(
      createElement(DashboardHero, {
        northStarValue: 14,
        npsLiftIndex: 11.4,
        featuresShipped: 6,
      }),
    );
    expect(html).toContain("Features Shipped");
    expect(html).toContain('data-testid="features-shipped"');
  });
});
