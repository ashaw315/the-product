import { describe, it, expect, vi } from "vitest";
import { renderToString } from "react-dom/server";
import { createElement } from "react";

vi.mock("@/lib/product-metrics", () => ({}));

import { LatentEngagementIndicator } from "../app/components/LatentEngagementIndicator";

describe("PM-9-2: LatentEngagementIndicator", () => {
  it("renders with mocked props without error", () => {
    const html = renderToString(
      createElement(LatentEngagementIndicator, { engagement: 42, northStar: 100 }),
    );
    expect(html).toBeTruthy();
  });

  it("link to /returns is present with correct href", () => {
    const html = renderToString(
      createElement(LatentEngagementIndicator, { engagement: 42, northStar: 100 }),
    );
    expect(html).toContain('href="/returns"');
  });

  it("engagement value appears in rendered output", () => {
    const html = renderToString(
      createElement(LatentEngagementIndicator, { engagement: 42, northStar: 100 }),
    );
    expect(html).toContain("42");
  });

  it("northStar value appears in rendered output", () => {
    const html = renderToString(
      createElement(LatentEngagementIndicator, { engagement: 42, northStar: 100 }),
    );
    expect(html).toContain("100");
  });

  it("prose contains language referencing accumulation or returning", () => {
    const html = renderToString(
      createElement(LatentEngagementIndicator, { engagement: 42, northStar: 100 }),
    );
    expect(html.toLowerCase()).toMatch(/accumulat|returning/);
  });
});
