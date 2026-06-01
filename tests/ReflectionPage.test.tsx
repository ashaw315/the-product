import { describe, it, expect, vi } from "vitest";
import { renderToString } from "react-dom/server";

vi.mock("@/lib/product-metrics", () => ({
  getSprintCount: async () => 1,
  getVelocity: async () => 6.5,
  getNorthStar: async () => 14,
}));

import ReflectionPage from "../app/reflection/page";

describe("PM-3-5: ReflectionPage", () => {
  it("renders the heading 'The Product Reflects'", async () => {
    const el = await ReflectionPage();
    const html = renderToString(el);
    expect(html).toContain("The Product Reflects");
  });

  it("renders sprint count, velocity, and north star values in output", async () => {
    const el = await ReflectionPage();
    const html = renderToString(el);
    expect(html).toContain("1");
    expect(html).toContain("6.5");
    expect(html).toContain("14");
  });

  it("renders a back link to '/'", async () => {
    const el = await ReflectionPage();
    const html = renderToString(el);
    expect(html).toContain('href="/"');
  });
});
