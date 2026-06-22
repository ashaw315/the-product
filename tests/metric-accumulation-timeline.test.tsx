import { describe, it, expect } from "vitest";
import { renderToString } from "react-dom/server";
import { createElement } from "react";
import { MetricAccumulationTimeline } from "../app/components/MetricAccumulationTimeline";

const mockMetrics = {
  sprintCount: 4,
  featureCount: 10,
  velocity: 7.2,
  engagement: 55,
  northStar: 110,
  testsPassing: 100,
  npsLiftIndex: 11.4,
};

describe("PM-6-4: MetricAccumulationTimeline component", () => {
  it("renders without error", () => {
    const html = renderToString(
      createElement(MetricAccumulationTimeline, { metrics: mockMetrics }),
    );
    expect(html).toBeTruthy();
  });

  it("renders the timeline container", () => {
    const html = renderToString(
      createElement(MetricAccumulationTimeline, { metrics: mockMetrics }),
    );
    expect(html).toContain('data-testid="metric-accumulation-timeline"');
    expect(html).toContain('aria-label="metric accumulation timeline"');
  });

  it("renders timeline entries from the metrics prop", () => {
    const html = renderToString(
      createElement(MetricAccumulationTimeline, { metrics: mockMetrics }),
    );
    const entries = html.match(/data-testid="timeline-entry"/g);
    expect(entries).toBeTruthy();
    expect(entries!.length).toBeGreaterThan(0);
  });

  it("renders the north star value from props", () => {
    const html = renderToString(
      createElement(MetricAccumulationTimeline, { metrics: mockMetrics }),
    );
    expect(html).toContain("110");
    expect(html).toContain("north star");
  });

  it("renders the feature count from props", () => {
    const html = renderToString(
      createElement(MetricAccumulationTimeline, { metrics: mockMetrics }),
    );
    expect(html).toContain("10");
    expect(html).toContain("features");
  });

  it("renders the sprint count from props", () => {
    const html = renderToString(
      createElement(MetricAccumulationTimeline, { metrics: mockMetrics }),
    );
    expect(html).toContain("4");
    expect(html).toContain("sprints");
  });

  it("renders velocity formatted to one decimal", () => {
    const html = renderToString(
      createElement(MetricAccumulationTimeline, { metrics: mockMetrics }),
    );
    expect(html).toContain("7.2");
    expect(html).toContain("velocity");
  });

  it("renders tests passing as percentage", () => {
    const html = renderToString(
      createElement(MetricAccumulationTimeline, { metrics: mockMetrics }),
    );
    expect(html).toContain("100%");
  });

  it("renders nps lift index with leading +", () => {
    const html = renderToString(
      createElement(MetricAccumulationTimeline, { metrics: mockMetrics }),
    );
    expect(html).toContain("+11.4");
  });

  it("does not itself call any lib/ functions (purely presentational)", () => {
    // The component receives data as props only — no async fetching.
    // If it called lib functions, this synchronous createElement call would fail
    // (since it's not in an async context and lib functions return Promises).
    const html = renderToString(
      createElement(MetricAccumulationTimeline, { metrics: mockMetrics }),
    );
    expect(html).not.toContain("undefined");
    expect(html).not.toContain("[object Promise]");
  });

  it("renders different values when different props are passed (structural check)", () => {
    const otherMetrics = {
      sprintCount: 1,
      featureCount: 2,
      velocity: 1.0,
      engagement: 5,
      northStar: 6,
      testsPassing: 100,
      npsLiftIndex: 11.4,
    };
    const html = renderToString(
      createElement(MetricAccumulationTimeline, { metrics: otherMetrics }),
    );
    expect(html).toContain(">6<"); // northStar
    expect(html).toContain(">2<"); // featureCount
    expect(html).toContain(">1<"); // sprintCount
  });
});
