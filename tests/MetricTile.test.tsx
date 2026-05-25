// @vitest-environment jsdom
import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { MetricTile } from "../app/components/MetricTile";

afterEach(cleanup);

describe("PM-2-3: MetricTile interactive wrapper", () => {
  it("renders children when provided", () => {
    render(
      <MetricTile>
        <span data-testid="child">child content</span>
      </MetricTile>,
    );
    const child = screen.getByTestId("child");
    expect(child.textContent).toBe("child content");
  });

  it("renders label and value when no children provided", () => {
    render(<MetricTile label="Test Metric" value={42} />);
    const tile = screen.getByTestId("metric-tile");
    expect(tile.textContent).toContain("Test Metric");
    expect(tile.textContent).toContain("42");
  });

  it("has role=button and tabIndex=0 when metricKey is provided", () => {
    render(
      <MetricTile label="North Star" value={14} metricKey="northStar" />,
    );
    const tile = screen.getByTestId("metric-tile");
    expect(tile.getAttribute("role")).toBe("button");
    expect(tile.getAttribute("tabindex")).toBe("0");
  });

  it("tile element has transition and interactive class when metricKey is set", () => {
    render(
      <MetricTile label="North Star" value={14} metricKey="northStar" />,
    );
    const tile = screen.getByTestId("metric-tile");
    // The CSS module class contains "tileInteractive" (or its scoped variant)
    expect(tile.className).toContain("tile");
  });

  it("calls onMetricClick with the metricKey when clicked", () => {
    const onMetricClick = vi.fn();
    render(
      <MetricTile
        label="Engagement"
        value={42}
        metricKey="engagement"
        onMetricClick={onMetricClick}
      />,
    );
    const tile = screen.getByTestId("metric-tile");
    fireEvent.click(tile);
    expect(onMetricClick).toHaveBeenCalledWith("engagement");
  });

  it("does not have role=button when metricKey is absent", () => {
    render(<MetricTile label="Static" value={0} />);
    const tile = screen.getByTestId("metric-tile");
    expect(tile.getAttribute("role")).toBeNull();
    expect(tile.getAttribute("tabindex")).toBeNull();
  });

  it("renders descriptor when provided", () => {
    render(
      <MetricTile label="Velocity" value="6.5" descriptor="tickets per sprint" />,
    );
    const tile = screen.getByTestId("metric-tile");
    expect(tile.textContent).toContain("tickets per sprint");
  });
});
