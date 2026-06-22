import { describe, it, expect } from "vitest";
import { renderToString } from "react-dom/server";
import { createElement } from "react";
import { DiscoveryRibbon } from "../app/components/DiscoveryRibbon";

describe("PM-6-3 / PM-6-5: DiscoveryRibbon component", () => {
  it("renders without error", () => {
    const html = renderToString(createElement(DiscoveryRibbon, {}));
    expect(html).toBeTruthy();
  });

  it("renders the navigation landmark", () => {
    const html = renderToString(createElement(DiscoveryRibbon, {}));
    expect(html).toContain('aria-label="discovery ribbon"');
    expect(html).toContain('data-testid="discovery-ribbon"');
  });

  it("includes a link to the dashboard at /", () => {
    const html = renderToString(createElement(DiscoveryRibbon, {}));
    expect(html).toContain('href="/"');
    expect(html).toContain('data-testid="ribbon-link-home"');
  });

  it("includes a link to /surfaces", () => {
    const html = renderToString(createElement(DiscoveryRibbon, {}));
    expect(html).toContain('href="/surfaces"');
    expect(html).toContain('data-testid="ribbon-link-surfaces"');
  });

  it("includes a navigable link to /presence (PM-6-3)", () => {
    const html = renderToString(createElement(DiscoveryRibbon, {}));
    expect(html).toContain('href="/presence"');
    expect(html).toContain('data-testid="ribbon-link-presence"');
  });

  it("/presence link has plain text label consistent with product voice", () => {
    const html = renderToString(createElement(DiscoveryRibbon, {}));
    expect(html).toContain("return depth view");
  });

  it("/presence link contains no external domain references", () => {
    const html = renderToString(createElement(DiscoveryRibbon, {}));
    const linkMatch = html.match(/href="\/presence"[^>]*>[^<]*/);
    expect(linkMatch).toBeTruthy();
    expect(html).not.toMatch(/href="https?:\/\//);
  });

  it("all three links are present (no regression)", () => {
    const html = renderToString(createElement(DiscoveryRibbon, {}));
    const links = html.match(/href="[^"]+"/g);
    expect(links).toHaveLength(3);
    expect(links).toContain('href="/"');
    expect(links).toContain('href="/surfaces"');
    expect(links).toContain('href="/presence"');
  });
});
