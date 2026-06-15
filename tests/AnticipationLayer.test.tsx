import { describe, it, expect, vi } from "vitest";
import { renderToString } from "react-dom/server";

const mockGetVelocity = vi.fn(async () => 5.5);

vi.mock("@/lib/product-metrics", () => ({
  getVelocity: () => mockGetVelocity(),
}));

import { AnticipationLayer } from "../app/components/AnticipationLayer";

describe("PM-5-5: AnticipationLayer", () => {
  it("renders without error", async () => {
    const element = await AnticipationLayer();
    const html = renderToString(element);
    expect(html).toBeTruthy();
  });

  it("renders expected content with velocity metric", async () => {
    const element = await AnticipationLayer();
    const html = renderToString(element);
    expect(html).toContain("5.5");
    expect(html).toContain("tickets per sprint");
  });

  it("handles zero velocity gracefully with a fallback message", async () => {
    mockGetVelocity.mockResolvedValueOnce(0);
    const element = await AnticipationLayer();
    const html = renderToString(element);
    expect(html).toBeTruthy();
    expect(html).toContain("gathering scope");
  });
});
