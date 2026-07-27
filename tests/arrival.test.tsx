import { describe, it, expect, vi } from "vitest";
import { renderToString } from "react-dom/server";

vi.mock("@/lib/product-metrics", () => ({
  getNorthStar: async () => 42,
  getSprintCount: async () => 11,
  getFeatureCount: async () => 7,
}));

import ArrivalPage from "../app/arrival/page";

describe("PM-11-1: Arrival page", () => {
  it("renders without crashing", async () => {
    const tree = await ArrivalPage();
    const html = renderToString(tree);
    expect(html).toBeTruthy();
  });

  it("renders the 'Something Showed Up' heading", async () => {
    const tree = await ArrivalPage();
    const html = renderToString(tree);
    expect(html).toContain("Something Showed Up");
  });

  it("renders the north star value in the hero prose frame", async () => {
    const tree = await ArrivalPage();
    const html = renderToString(tree);
    expect(html).toContain("42");
    expect(html).toContain("It was here before you arrived and it is here now.");
  });

  it("renders the sprint count in the secondary prose frame", async () => {
    const tree = await ArrivalPage();
    const html = renderToString(tree);
    expect(html).toContain("11");
    expect(html).toContain("Each one continued.");
  });

  it("renders the feature count in the tertiary prose frame", async () => {
    const tree = await ArrivalPage();
    const html = renderToString(tree);
    expect(html).toContain("7");
    expect(html).toContain("They accumulated while you were away.");
  });

  it("renders all three metric values in the output", async () => {
    const tree = await ArrivalPage();
    const html = renderToString(tree);
    expect(html).toContain("42");
    expect(html).toContain("11");
    expect(html).toContain("7");
  });

  it("renders a link back to '/'", async () => {
    const tree = await ArrivalPage();
    const html = renderToString(tree);
    expect(html).toContain('href="/"');
    expect(html).toContain("Return to the dashboard");
  });
});
