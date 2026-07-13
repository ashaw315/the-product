import { describe, it, expect, vi } from "vitest";
import { renderToString } from "react-dom/server";
import { createElement } from "react";

vi.mock("@/lib/product-metrics", () => ({
  getAllMetrics: async () => ({
    northStar: 42,
    velocity: 6.5,
    featureCount: 6,
    sprintCount: 9,
    testsPassing: 100,
    engagement: 7,
    npsLiftIndex: 11.4,
  }),
}));

import { ReturnSignalAccumulator } from "../app/components/ReturnSignalAccumulator";
import ReturnsPage from "../app/returns/page";

const mockMetrics = {
  northStar: 42,
  velocity: 6.5,
  featureCount: 6,
  sprintCount: 9,
  testsPassing: 100,
};

describe("PM-9-1: ReturnSignalAccumulator component", () => {
  it("renders with mocked metrics without error", () => {
    const html = renderToString(
      createElement(ReturnSignalAccumulator, { metrics: mockMetrics }),
    );
    expect(html).toBeTruthy();
  });

  it("renders north star label and value", () => {
    const html = renderToString(
      createElement(ReturnSignalAccumulator, { metrics: mockMetrics }),
    );
    expect(html).toContain("North Star");
    expect(html).toContain("42");
  });

  it("renders velocity label and value", () => {
    const html = renderToString(
      createElement(ReturnSignalAccumulator, { metrics: mockMetrics }),
    );
    expect(html).toContain("Velocity");
    expect(html).toContain("6.5");
  });

  it("renders feature count label and value", () => {
    const html = renderToString(
      createElement(ReturnSignalAccumulator, { metrics: mockMetrics }),
    );
    expect(html).toContain("Feature Count");
    expect(html).toContain(">6<");
  });

  it("renders sprint count label and value", () => {
    const html = renderToString(
      createElement(ReturnSignalAccumulator, { metrics: mockMetrics }),
    );
    expect(html).toContain("Sprint Count");
    expect(html).toContain("9");
  });

  it("renders tests passing label and value", () => {
    const html = renderToString(
      createElement(ReturnSignalAccumulator, { metrics: mockMetrics }),
    );
    expect(html).toContain("Tests Passing");
    expect(html).toContain("100%");
  });
});

describe("PM-9-1: Returns page", () => {
  it("renders the page titled 'Return Signal Accumulator'", async () => {
    const tree = await ReturnsPage();
    const html = renderToString(tree);
    expect(html).toContain("Return Signal Accumulator");
  });

  it("includes orientation paragraph with 'the product has been accumulating'", async () => {
    const tree = await ReturnsPage();
    const html = renderToString(tree);
    expect(html).toContain("the product has been accumulating");
  });

  it("link to '/' is present", async () => {
    const tree = await ReturnsPage();
    const html = renderToString(tree);
    expect(html).toContain('href="/"');
  });
});
