import { describe, it, expect, vi } from "vitest";
import { renderToString } from "react-dom/server";

vi.mock("@/lib/product-metrics", () => ({
  getAllMetrics: vi.fn(),
}));

import { getAllMetrics } from "@/lib/product-metrics";
import QuietStateModule from "../app/components/QuietStateModule";

const baseMetrics = {
  northStar: 14,
  sprintCount: 1,
  velocity: 6.5,
  featureCount: 6,
  engagement: 42,
  testsPassing: 100,
  npsLiftIndex: 11.4,
};

describe("PM-3-1: QuietStateModule", () => {
  it("renders prose when all three values are present and non-zero", async () => {
    vi.mocked(getAllMetrics).mockResolvedValue(baseMetrics);
    const el = await QuietStateModule();
    expect(el).not.toBeNull();
    const html = renderToString(el!);
    expect(html).toContain("1");
    expect(html).toContain("6.5");
    expect(html).toContain("14");
  });

  it("renders nothing when northStar is null", async () => {
    vi.mocked(getAllMetrics).mockResolvedValue({
      ...baseMetrics,
      northStar: null as unknown as number,
    });
    const el = await QuietStateModule();
    expect(el).toBeNull();
  });

  it("renders nothing when sprintCount is null", async () => {
    vi.mocked(getAllMetrics).mockResolvedValue({
      ...baseMetrics,
      sprintCount: null as unknown as number,
    });
    const el = await QuietStateModule();
    expect(el).toBeNull();
  });

  it("renders nothing when velocity is null", async () => {
    vi.mocked(getAllMetrics).mockResolvedValue({
      ...baseMetrics,
      velocity: null as unknown as number,
    });
    const el = await QuietStateModule();
    expect(el).toBeNull();
  });

  it("renders nothing when northStar is zero", async () => {
    vi.mocked(getAllMetrics).mockResolvedValue({ ...baseMetrics, northStar: 0 });
    const el = await QuietStateModule();
    expect(el).toBeNull();
  });

  it("renders nothing when sprintCount is zero", async () => {
    vi.mocked(getAllMetrics).mockResolvedValue({
      ...baseMetrics,
      sprintCount: 0,
    });
    const el = await QuietStateModule();
    expect(el).toBeNull();
  });

  it("renders nothing when velocity is zero", async () => {
    vi.mocked(getAllMetrics).mockResolvedValue({ ...baseMetrics, velocity: 0 });
    const el = await QuietStateModule();
    expect(el).toBeNull();
  });
});
