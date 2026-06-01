import { describe, it, expect } from "vitest";
import { renderToString } from "react-dom/server";
import { createElement } from "react";
import GuidedOrientationBanner from "../app/components/GuidedOrientationBanner";

describe("PM-3-3: GuidedOrientationBanner", () => {
  it("banner renders", () => {
    const html = renderToString(createElement(GuidedOrientationBanner));
    expect(html.length).toBeGreaterThan(0);
  });

  it("contains an anchor with href='/engagement'", () => {
    const html = renderToString(createElement(GuidedOrientationBanner));
    expect(html).toContain('href="/engagement"');
  });

  it("link text reads exactly 'Explore engagement with the engagement dashboard.'", () => {
    const html = renderToString(createElement(GuidedOrientationBanner));
    expect(html).toContain(
      "Explore engagement with the engagement dashboard."
    );
  });

  it("prior banner content is still present", () => {
    const html = renderToString(createElement(GuidedOrientationBanner));
    expect(html).toContain("You are here");
  });
});
