import { describe, it, expect, vi } from "vitest";
import { renderToString } from "react-dom/server";

vi.mock("@/lib/product-metrics", () => ({
  getNorthStar: async () => 42,
  getEngagement: async () => 99,
}));

import { ActionInvitationLayer } from "../app/components/ActionInvitationLayer";

describe("PM-11-4: ActionInvitationLayer", () => {
  it("renders without crashing", async () => {
    const tree = await ActionInvitationLayer();
    const html = renderToString(tree);
    expect(html).toBeTruthy();
  });

  it("renders expected structural elements", async () => {
    const tree = await ActionInvitationLayer();
    const html = renderToString(tree);
    expect(html).toContain('aria-label="action invitation layer"');
    expect(html).toContain("Take Action");
  });

  it("renders the north star metric value", async () => {
    const tree = await ActionInvitationLayer();
    const html = renderToString(tree);
    expect(html).toContain("42");
  });

  it("renders the engagement metric value", async () => {
    const tree = await ActionInvitationLayer();
    const html = renderToString(tree);
    expect(html).toContain("99");
  });
});
