// @vitest-environment jsdom
import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import {
  MetricDetailDrawer,
  METRIC_NARRATIVES,
} from "../app/components/MetricDetailDrawer";

afterEach(cleanup);

describe("PM-2-2: MetricDetailDrawer", () => {
  it("drawer is not visible on initial render (activeMetric is null)", () => {
    render(<MetricDetailDrawer activeMetric={null} onClose={() => {}} />);
    const drawer = screen.getByTestId("metric-detail-drawer");
    expect(drawer.getAttribute("aria-hidden")).toBe("true");
  });

  it("drawer becomes visible after a tile click (activeMetric set)", () => {
    render(
      <MetricDetailDrawer activeMetric="engagement" onClose={() => {}} />,
    );
    const drawer = screen.getByTestId("metric-detail-drawer");
    expect(drawer.getAttribute("aria-hidden")).toBe("false");
  });

  it("drawer content matches the expected narrative for the clicked metric", () => {
    render(
      <MetricDetailDrawer activeMetric="engagement" onClose={() => {}} />,
    );
    const narrative = screen.getByTestId("drawer-narrative");
    expect(narrative.textContent).toContain(
      "Engagement measures the degree to which the product is engaged with",
    );
    expect(narrative.textContent).toContain(METRIC_NARRATIVES.engagement.substring(0, 30));
  });

  it("close button calls onClose and drawer returns to hidden state", () => {
    const onClose = vi.fn();
    const { rerender } = render(
      <MetricDetailDrawer activeMetric="engagement" onClose={onClose} />,
    );
    const closeButton = screen.getByTestId("drawer-close-button");
    fireEvent.click(closeButton);
    expect(onClose).toHaveBeenCalledOnce();

    rerender(<MetricDetailDrawer activeMetric={null} onClose={onClose} />);
    const drawer = screen.getByTestId("metric-detail-drawer");
    expect(drawer.getAttribute("aria-hidden")).toBe("true");
  });

  it("narrative map covers all required metric keys", () => {
    const required = [
      "northStar",
      "engagement",
      "velocity",
      "featureCount",
      "sprintCount",
      "testsPassing",
      "npsLiftIndex",
    ];
    for (const key of required) {
      expect(METRIC_NARRATIVES[key]).toBeDefined();
    }
  });

  it("close button is rendered when drawer is open", () => {
    render(
      <MetricDetailDrawer activeMetric="velocity" onClose={() => {}} />,
    );
    const closeBtn = screen.getByTestId("drawer-close-button");
    expect(closeBtn).toBeDefined();
  });
});
