import { describe, it, expect, vi } from "vitest";
import { renderToString } from "react-dom/server";

vi.mock("@/lib/product-metrics", () => ({
  getUser: () => ({ id: "test-user", name: "the user", plan: "the plan" }),
  getNorthStar: async () => 21,
}));

import { ReturnBeacon } from "../app/components/ReturnBeacon";

describe("PM-5-5: ReturnBeacon", () => {
  it("renders without error", async () => {
    const element = await ReturnBeacon();
    const html = renderToString(element);
    expect(html).toBeTruthy();
  });

  it("renders content derived from metric primitives", async () => {
    const element = await ReturnBeacon();
    const html = renderToString(element);
    expect(html).toContain("the user"); // from getUser()
    expect(html).toContain("21"); // from getNorthStar()
  });

  it("applies correct structural role via aria-label", async () => {
    const element = await ReturnBeacon();
    const html = renderToString(element);
    expect(html).toContain('aria-label="return beacon"');
  });
});
