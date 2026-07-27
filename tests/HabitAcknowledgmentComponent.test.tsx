import { describe, it, expect, vi } from "vitest";
import { renderToString } from "react-dom/server";

vi.mock("@/lib/product-metrics", () => ({
  getNorthStar: async () => 42,
  getSprintCount: async () => 11,
}));

import { HabitAcknowledgmentComponent } from "../app/components/HabitAcknowledgmentComponent";

describe("PM-11-2: HabitAcknowledgmentComponent", () => {
  it("renders without crashing", async () => {
    const tree = await HabitAcknowledgmentComponent();
    const html = renderToString(tree);
    expect(html).toBeTruthy();
  });

  it("renders the north star value within the prose frame", async () => {
    const tree = await HabitAcknowledgmentComponent();
    const html = renderToString(tree);
    expect(html).toContain("42");
  });

  it("renders the sprint count within the prose frame", async () => {
    const tree = await HabitAcknowledgmentComponent();
    const html = renderToString(tree);
    expect(html).toContain("11");
  });

  it("renders both metric values in the output", async () => {
    const tree = await HabitAcknowledgmentComponent();
    const html = renderToString(tree);
    expect(html).toContain("42");
    expect(html).toContain("11");
  });

  it("renders the prose frame text", async () => {
    const tree = await HabitAcknowledgmentComponent();
    const html = renderToString(tree);
    expect(html).toContain("You have been here before.");
    expect(html).toContain("Returning is part of what makes this what it is.");
  });

  it("renders a link to '/arrival' with the label 'See what showed up.'", async () => {
    const tree = await HabitAcknowledgmentComponent();
    const html = renderToString(tree);
    expect(html).toContain('href="/arrival"');
    expect(html).toContain("See what showed up.");
  });
});
