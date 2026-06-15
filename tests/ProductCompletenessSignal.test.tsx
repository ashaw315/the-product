import { describe, it, expect, vi } from "vitest";
import { renderToString } from "react-dom/server";

const mockGetFeatureCount = vi.fn(async () => 12);
const mockGetSprintCount = vi.fn(async () => 4);

vi.mock("@/lib/product-metrics", () => ({
  getFeatureCount: () => mockGetFeatureCount(),
  getSprintCount: () => mockGetSprintCount(),
}));

import { ProductCompletenessSignal } from "../app/components/ProductCompletenessSignal";

describe("PM-5-1: ProductCompletenessSignal", () => {
  it("renders without error", async () => {
    const element = await ProductCompletenessSignal();
    const html = renderToString(element);
    expect(html).toBeTruthy();
  });

  it("renders mocked featureCount and sprintCount values in the output", async () => {
    const element = await ProductCompletenessSignal();
    const html = renderToString(element);
    expect(html).toContain("12");
    expect(html).toContain("4");
    expect(html).toContain("features across");
    expect(html).toContain("sprints");
  });

  it("renders correctly when featureCount and sprintCount are zero", async () => {
    mockGetFeatureCount.mockResolvedValueOnce(0);
    mockGetSprintCount.mockResolvedValueOnce(0);
    const element = await ProductCompletenessSignal();
    const html = renderToString(element);
    expect(html).toBeTruthy();
    expect(html).toContain("features across");
    expect(html).toContain("sprints");
    // Both zero values are present in the rendered output
    expect(html).toMatch(/\b0\b.*features.*\b0\b/);
  });
});
