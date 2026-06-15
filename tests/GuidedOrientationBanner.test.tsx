import { describe, it, expect } from "vitest";
import { renderToString } from "react-dom/server";
import { createElement } from "react";
import { GuidedOrientationBanner } from "../app/components/GuidedOrientationBanner";

describe("PM-5-4: GuidedOrientationBanner", () => {
  it("renders links to both /engagement and /surfaces in default state", () => {
    const html = renderToString(createElement(GuidedOrientationBanner, {}));
    expect(html).toContain('href="/engagement"');
    expect(html).toContain('href="/surfaces"');
  });

  it("renders 'view all surfaces' link text for the /surfaces link", () => {
    const html = renderToString(createElement(GuidedOrientationBanner, {}));
    expect(html).toContain("view all surfaces");
  });

  it("renders both links in quieted state", () => {
    const html = renderToString(
      createElement(GuidedOrientationBanner, { quieted: true }),
    );
    expect(html).toContain('href="/engagement"');
    expect(html).toContain('href="/surfaces"');
  });

  it("applies reduced visual prominence class in quieted state", () => {
    const html = renderToString(
      createElement(GuidedOrientationBanner, { quieted: true }),
    );
    expect(html).toContain("bannerQuieted");
    expect(html).toContain('data-quieted="true"');
  });
});
