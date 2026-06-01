import { describe, it, expect } from "vitest";
import { renderToString } from "react-dom/server";
import { createElement } from "react";
import DepthIndicator from "../app/components/DepthIndicator";

describe("PM-3-2: DepthIndicator", () => {
  it("component renders", () => {
    const html = renderToString(createElement(DepthIndicator));
    expect(html.length).toBeGreaterThan(0);
  });

  it("rendered output contains the designated copy string", () => {
    const html = renderToString(createElement(DepthIndicator));
    expect(html).toContain("There is more.");
  });

  it("contains no anchor or button elements", () => {
    const html = renderToString(createElement(DepthIndicator));
    expect(html).not.toContain("<a");
    expect(html).not.toContain("<button");
  });
});
