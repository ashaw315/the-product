import { describe, it, expect } from "vitest";
import { renderToString } from "react-dom/server";
import { createElement } from "react";
import DiscoveryRibbon from "../app/components/DiscoveryRibbon";

describe("PM-7-4: DiscoveryRibbon", () => {
  it("renders without error", () => {
    const html = renderToString(createElement(DiscoveryRibbon));
    expect(html).toBeTruthy();
  });

  it("includes a link to /orientation", () => {
    const html = renderToString(createElement(DiscoveryRibbon));
    expect(html).toContain('href="/orientation"');
  });

  it("includes a link to /presence", () => {
    const html = renderToString(createElement(DiscoveryRibbon));
    expect(html).toContain('href="/presence"');
  });

  it("includes a link to /surfaces", () => {
    const html = renderToString(createElement(DiscoveryRibbon));
    expect(html).toContain('href="/surfaces"');
  });

  it("renders all three links", () => {
    const html = renderToString(createElement(DiscoveryRibbon));
    expect(html).toContain('href="/orientation"');
    expect(html).toContain('href="/presence"');
    expect(html).toContain('href="/surfaces"');
  });

  it("renders /orientation as the first link", () => {
    const html = renderToString(createElement(DiscoveryRibbon));
    const orientationIdx = html.indexOf('href="/orientation"');
    const presenceIdx = html.indexOf('href="/presence"');
    const surfacesIdx = html.indexOf('href="/surfaces"');
    expect(orientationIdx).toBeGreaterThan(-1);
    expect(orientationIdx).toBeLessThan(presenceIdx);
    expect(orientationIdx).toBeLessThan(surfacesIdx);
  });
});
