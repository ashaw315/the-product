import { describe, it, expect } from "vitest";
import { renderToString } from "react-dom/server";
import { createElement } from "react";
import { DepthAcknowledgmentBanner } from "../app/components/DepthAcknowledgmentBanner";

describe("PM-10-5 / PM-10-3: DepthAcknowledgmentBanner", () => {
  it("renders without error", () => {
    const html = renderToString(createElement(DepthAcknowledgmentBanner, {}));
    expect(html).toBeTruthy();
  });

  it("renders the banner section", () => {
    const html = renderToString(createElement(DepthAcknowledgmentBanner, {}));
    expect(html).toContain('data-testid="depth-acknowledgment-banner"');
  });

  it("renders a CTA link pointing to /wayfinding", () => {
    const html = renderToString(createElement(DepthAcknowledgmentBanner, {}));
    expect(html).toContain('href="/wayfinding"');
    expect(html).toContain('data-testid="wayfinding-cta"');
  });

  it("renders a directional affordance alongside the CTA", () => {
    const html = renderToString(createElement(DepthAcknowledgmentBanner, {}));
    expect(html).toContain("→");
  });

  it("renders forward-oriented copy rather than passive arrival copy", () => {
    const html = renderToString(createElement(DepthAcknowledgmentBanner, {}));
    expect(html).toContain("discover");
    expect(html).toContain("Explore");
  });
});
