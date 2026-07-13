import { describe, it, expect, vi } from "vitest";
import { renderToString } from "react-dom/server";
import { createElement } from "react";

vi.mock("@/lib/product-metrics", () => ({}));

import { ReturnAcknowledgmentSignal } from "../app/components/ReturnAcknowledgmentSignal";

describe("PM-9-5: ReturnAcknowledgmentSignal", () => {
  it("renders without error with mocked props", () => {
    const html = renderToString(
      createElement(ReturnAcknowledgmentSignal, { northStar: 42 }),
    );
    expect(html).toBeTruthy();
  });

  it("key prose content is present — references return", () => {
    const html = renderToString(
      createElement(ReturnAcknowledgmentSignal, { northStar: 42 }),
    );
    expect(html.toLowerCase()).toContain("return");
  });

  it("renders the northStar value", () => {
    const html = renderToString(
      createElement(ReturnAcknowledgmentSignal, { northStar: 42 }),
    );
    expect(html).toContain("42");
  });

  it("navigation link to /stillness has correct href", () => {
    const html = renderToString(
      createElement(ReturnAcknowledgmentSignal, { northStar: 42 }),
    );
    expect(html).toContain('href="/stillness"');
  });
});
