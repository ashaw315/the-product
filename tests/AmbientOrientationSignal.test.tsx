import { describe, it, expect, vi } from "vitest";
import { renderToString } from "react-dom/server";

const mockGetEngagement = vi.fn().mockResolvedValue(0);

vi.mock("@/lib/product-metrics", () => ({
  getEngagement: () => mockGetEngagement(),
}));

import AmbientOrientationSignal from "../app/components/AmbientOrientationSignal";

describe("PM-7-5: AmbientOrientationSignal", () => {
  it("renders without error", async () => {
    mockGetEngagement.mockResolvedValue(42);
    const el = await AmbientOrientationSignal();
    const html = renderToString(el);
    expect(html).toBeTruthy();
  });

  it("renders non-empty output when engagement is zero (low/baseline state)", async () => {
    mockGetEngagement.mockResolvedValue(0);
    const el = await AmbientOrientationSignal();
    const html = renderToString(el);
    expect(html.trim().length).toBeGreaterThan(0);
    expect(html).toContain('data-testid="ambient-orientation-signal"');
    expect(html).toContain('data-testid="orientation-signal-text"');
  });

  it("renders non-empty output when engagement is high", async () => {
    mockGetEngagement.mockResolvedValue(100);
    const el = await AmbientOrientationSignal();
    const html = renderToString(el);
    expect(html.trim().length).toBeGreaterThan(0);
    expect(html).toContain('data-testid="ambient-orientation-signal"');
    expect(html).toContain('data-testid="orientation-signal-text"');
  });

  it("renders a different message for zero vs non-zero engagement", async () => {
    mockGetEngagement.mockResolvedValue(0);
    const lowEl = await AmbientOrientationSignal();
    const lowHtml = renderToString(lowEl);

    mockGetEngagement.mockResolvedValue(50);
    const highEl = await AmbientOrientationSignal();
    const highHtml = renderToString(highEl);

    expect(lowHtml).not.toBe(highHtml);
  });
});
