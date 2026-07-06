import { describe, it, expect, vi } from "vitest";
import { renderToString } from "react-dom/server";
import { createElement } from "react";

vi.mock("next/link", () => ({
  default: ({ href, children }: { href: string; children: React.ReactNode }) =>
    createElement("a", { href }, children),
}));

import { ContinuitySignalBanner } from "../app/components/ContinuitySignalBanner";

describe("ContinuitySignalBanner (PM-8-3, PM-8-5)", () => {
  it("renders a prose statement about continuity", () => {
    const html = renderToString(
      createElement(ContinuitySignalBanner, { sprintCount: 8 }),
    );
    expect(html).toContain("sprints");
    expect(html).toContain("8");
  });

  it("renders the sprintCount value", () => {
    const html = renderToString(
      createElement(ContinuitySignalBanner, { sprintCount: 3 }),
    );
    expect(html).toContain("3");
  });

  it("contains a navigational link to /stillness", () => {
    const html = renderToString(
      createElement(ContinuitySignalBanner, { sprintCount: 8 }),
    );
    expect(html).toContain('href="/stillness"');
  });

  it("renders with data-testid attribute", () => {
    const html = renderToString(
      createElement(ContinuitySignalBanner, { sprintCount: 8 }),
    );
    expect(html).toContain('data-testid="continuity-signal-banner"');
  });

  it("does not use high-contrast alert background colors (no inline style background)", () => {
    const html = renderToString(
      createElement(ContinuitySignalBanner, { sprintCount: 8 }),
    );
    expect(html).not.toMatch(/style="[^"]*background/);
  });
});
