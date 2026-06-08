import { describe, it, expect } from "vitest";
import { renderToString } from "react-dom/server";
import { createElement } from "react";
import { GuidedOrientationBanner } from "../app/components/GuidedOrientationBanner";

describe("PM-4-3: GuidedOrientationBanner", () => {
  it("renders in full state when isQuieted is false", () => {
    const html = renderToString(
      createElement(GuidedOrientationBanner, { isQuieted: false }),
    );
    expect(html.length).toBeGreaterThan(0);
    expect(html).toContain('data-state="full"');
  });

  it("renders full prose body when isQuieted is false", () => {
    const html = renderToString(
      createElement(GuidedOrientationBanner, { isQuieted: false }),
    );
    expect(html).toContain("accumulating");
  });

  it("renders a link to /engagement in full state", () => {
    const html = renderToString(
      createElement(GuidedOrientationBanner, { isQuieted: false }),
    );
    expect(html).toContain('href="/engagement"');
  });

  it("renders in collapsed state when isQuieted is true", () => {
    const html = renderToString(
      createElement(GuidedOrientationBanner, { isQuieted: true }),
    );
    expect(html.length).toBeGreaterThan(0);
    expect(html).toContain('data-state="quieted"');
  });

  it("renders a link to /engagement in quieted state", () => {
    const html = renderToString(
      createElement(GuidedOrientationBanner, { isQuieted: true }),
    );
    expect(html).toContain('href="/engagement"');
  });

  it("suppresses full prose body in quieted state", () => {
    const quietedHtml = renderToString(
      createElement(GuidedOrientationBanner, { isQuieted: true }),
    );
    expect(quietedHtml).not.toContain("accumulating");
  });

  it("quieted state is shorter than full state", () => {
    const fullHtml = renderToString(
      createElement(GuidedOrientationBanner, { isQuieted: false }),
    );
    const quietedHtml = renderToString(
      createElement(GuidedOrientationBanner, { isQuieted: true }),
    );
    expect(quietedHtml.length).toBeLessThan(fullHtml.length);
  });
});
