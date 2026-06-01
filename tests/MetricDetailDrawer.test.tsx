import { describe, it, expect } from "vitest";
import { renderToString } from "react-dom/server";
import { createElement } from "react";
import { MetricDetailDrawer } from "../app/components/MetricDetailDrawer";

describe("PM-3-4: MetricDetailDrawer", () => {
  it("component renders without error", () => {
    const html = renderToString(
      createElement(MetricDetailDrawer, {
        isOpen: true,
        label: "North Star",
        value: "14",
      })
    );
    expect(html).toBeDefined();
  });

  it("drawer is not visible in closed state", () => {
    const html = renderToString(
      createElement(MetricDetailDrawer, {
        isOpen: false,
        label: "North Star",
        value: "14",
      })
    );
    expect(html).not.toContain('data-testid="metric-detail-drawer"');
  });

  it("drawer becomes visible when triggered open via prop", () => {
    const html = renderToString(
      createElement(MetricDetailDrawer, {
        isOpen: true,
        label: "North Star",
        value: "14",
      })
    );
    expect(html).toContain('data-testid="metric-detail-drawer"');
    expect(html).toContain("North Star");
    expect(html).toContain("14");
  });
});
