import { describe, it, expect, vi } from "vitest";
import { renderToString } from "react-dom/server";
import { createElement } from "react";

vi.mock("@/lib/product-metrics", () => ({}));

import { ContinuitySignalBanner } from "../app/components/ContinuitySignalBanner";

describe("PM-9-5: ContinuitySignalBanner", () => {
  it("renders without error with mocked props", () => {
    const html = renderToString(
      createElement(ContinuitySignalBanner, { sprintCount: 5, velocity: 6.5 }),
    );
    expect(html).toBeTruthy();
  });

  it("banner content is present — sprintCount and velocity rendered", () => {
    const html = renderToString(
      createElement(ContinuitySignalBanner, { sprintCount: 5, velocity: 6.5 }),
    );
    expect(html).toContain("5");
    expect(html).toContain("6.5");
  });

  it("tonal alignment attribute is present", () => {
    const html = renderToString(
      createElement(ContinuitySignalBanner, { sprintCount: 5, velocity: 6.5 }),
    );
    expect(html).toContain("data-tonal-alignment");
  });

  it("tonal alignment value is continuity", () => {
    const html = renderToString(
      createElement(ContinuitySignalBanner, { sprintCount: 5, velocity: 6.5 }),
    );
    expect(html).toContain('data-tonal-alignment="continuity"');
  });
});
