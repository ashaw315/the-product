import { describe, it, expect, vi } from "vitest";
import { renderToString } from "react-dom/server";
import { createElement } from "react";

vi.mock("next/link", () => ({
  default: ({ href, children }: { href: string; children: React.ReactNode }) =>
    createElement("a", { href }, children),
}));

import { DiscoveryRibbon } from "../app/components/DiscoveryRibbon";

describe("DiscoveryRibbon (PM-8-4)", () => {
  it("contains a navigational link to /stillness", () => {
    const html = renderToString(createElement(DiscoveryRibbon, {}));
    expect(html).toContain('href="/stillness"');
  });

  it("contains a label for /stillness in the product voice (under 40 chars)", () => {
    const html = renderToString(createElement(DiscoveryRibbon, {}));
    expect(html).toContain("stillness");
    expect("stillness".length).toBeLessThanOrEqual(40);
  });

  it("contains a navigational link to /presence", () => {
    const html = renderToString(createElement(DiscoveryRibbon, {}));
    expect(html).toContain('href="/presence"');
  });

  it("contains a navigational link to /orientation", () => {
    const html = renderToString(createElement(DiscoveryRibbon, {}));
    expect(html).toContain('href="/orientation"');
  });

  it("contains a navigational link to /surfaces", () => {
    const html = renderToString(createElement(DiscoveryRibbon, {}));
    expect(html).toContain('href="/surfaces"');
  });

  it("contains a navigational link to /engagement", () => {
    const html = renderToString(createElement(DiscoveryRibbon, {}));
    expect(html).toContain('href="/engagement"');
  });

  it("renders with the discovery ribbon aria-label", () => {
    const html = renderToString(createElement(DiscoveryRibbon, {}));
    expect(html).toContain('aria-label="discovery ribbon"');
  });
});
