import { describe, it, expect } from "vitest";
import { renderToString } from "react-dom/server";
import { createElement } from "react";
import { ThresholdMoment } from "../app/components/ThresholdMoment";

describe("ThresholdMoment (PM-8-5)", () => {
  it("renders the 'reached' branch when value equals threshold", () => {
    const html = renderToString(
      createElement(ThresholdMoment, { value: 10, threshold: 10 }),
    );
    expect(html).toContain("the threshold has been reached.");
    expect(html).toContain('data-crossed="true"');
  });

  it("renders the 'reached' branch when value exceeds threshold", () => {
    const html = renderToString(
      createElement(ThresholdMoment, { value: 15, threshold: 10 }),
    );
    expect(html).toContain("the threshold has been reached.");
    expect(html).toContain('data-crossed="true"');
  });

  it("renders the 'not reached' branch when value is below threshold", () => {
    const html = renderToString(
      createElement(ThresholdMoment, { value: 5, threshold: 10 }),
    );
    expect(html).toContain("the threshold has not yet been reached.");
    expect(html).toContain('data-crossed="false"');
  });

  it("renders with data-testid attribute", () => {
    const html = renderToString(
      createElement(ThresholdMoment, { value: 1, threshold: 1 }),
    );
    expect(html).toContain('data-testid="threshold-moment"');
  });
});
