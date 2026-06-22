import { describe, it, expect, vi } from "vitest";
import { renderToString } from "react-dom/server";

vi.mock("@/lib/product-metrics", () => ({
  getAllMetrics: vi.fn().mockResolvedValue({
    sprintCount: 3,
    featureCount: 6,
    velocity: 6.5,
    engagement: 42,
    northStar: 14,
    testsPassing: 100,
    npsLiftIndex: 11.4,
  }),
  getSprintCount: vi.fn().mockResolvedValue(3),
}));

import PresencePage from "../app/presence/page";
import { getSprintCount, getAllMetrics } from "@/lib/product-metrics";

describe("PM-6-1: Return Depth View page at /presence", () => {
  it("is a valid server component that renders without error", async () => {
    const tree = await PresencePage();
    const html = renderToString(tree);
    expect(html).toBeTruthy();
  });

  it("renders the page heading and sprint label", async () => {
    const tree = await PresencePage();
    const html = renderToString(tree);
    expect(html).toContain("Return Depth View");
    expect(html).toContain("presence across");
    expect(html).toContain('data-testid="presence-sprint-count"');
  });

  it("sprint count drives rendered element count (3 sprints → 3 layers)", async () => {
    const tree = await PresencePage();
    const html = renderToString(tree);
    const layers = html.match(/data-testid="sprint-layer"/g);
    expect(layers).toHaveLength(3);
  });

  it("sprint count drives rendered element count (1 sprint → 1 layer)", async () => {
    vi.mocked(getSprintCount).mockResolvedValueOnce(1);
    vi.mocked(getAllMetrics).mockResolvedValueOnce({
      sprintCount: 1,
      featureCount: 6,
      velocity: 6.5,
      engagement: 42,
      northStar: 14,
      testsPassing: 100,
      npsLiftIndex: 11.4,
    });
    const tree = await PresencePage();
    const html = renderToString(tree);
    const layers = html.match(/data-testid="sprint-layer"/g);
    expect(layers).toHaveLength(1);
  });

  it("sprint count drives rendered element count (5 sprints → 5 layers)", async () => {
    vi.mocked(getSprintCount).mockResolvedValueOnce(5);
    vi.mocked(getAllMetrics).mockResolvedValueOnce({
      sprintCount: 5,
      featureCount: 6,
      velocity: 6.5,
      engagement: 42,
      northStar: 14,
      testsPassing: 100,
      npsLiftIndex: 11.4,
    });
    const tree = await PresencePage();
    const html = renderToString(tree);
    const layers = html.match(/data-testid="sprint-layer"/g);
    expect(layers).toHaveLength(5);
  });

  it("each sprint layer displays metric values from getAllMetrics()", async () => {
    const tree = await PresencePage();
    const html = renderToString(tree);
    expect(html).toContain("14"); // northStar
    expect(html).toContain("6"); // featureCount
    expect(html).toContain("6.5"); // velocity
    expect(html).toContain("42"); // engagement
  });

  it("renders the MetricAccumulationTimeline", async () => {
    const tree = await PresencePage();
    const html = renderToString(tree);
    expect(html).toContain('data-testid="metric-accumulation-timeline"');
  });

  it("sprint layers container is present in the DOM", async () => {
    const tree = await PresencePage();
    const html = renderToString(tree);
    expect(html).toContain('data-testid="sprint-layers"');
  });
});
