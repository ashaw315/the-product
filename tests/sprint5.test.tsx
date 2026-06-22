import { describe, it, expect, vi } from "vitest";
import { renderToString } from "react-dom/server";
import { createElement } from "react";

// Mock for components that use lib/product-metrics
vi.mock("@/lib/product-metrics", () => ({
  getAllMetrics: vi.fn().mockResolvedValue({
    sprintCount: 5,
    featureCount: 12,
    velocity: 8.0,
    engagement: 88,
    northStar: 78,
    testsPassing: 100,
    npsLiftIndex: 11.4,
  }),
  getSprintCount: vi.fn().mockResolvedValue(5),
}));

import { GuidedOrientationBanner } from "../app/components/GuidedOrientationBanner";
import { ProductCompletenessSignal } from "../app/components/ProductCompletenessSignal";
import SurfacesPage from "../app/surfaces/page";

// DiscoveryRibbon is covered in tests/discovery-ribbon.test.tsx

describe("PM-6-5: Sprint 5 — GuidedOrientationBanner", () => {
  it("renders without error", () => {
    const html = renderToString(
      createElement(GuidedOrientationBanner, {
        sprintCount: 5,
        featureCount: 12,
      }),
    );
    expect(html).toBeTruthy();
  });

  it("renders the aria label", () => {
    const html = renderToString(
      createElement(GuidedOrientationBanner, {
        sprintCount: 5,
        featureCount: 12,
      }),
    );
    expect(html).toContain('aria-label="guided orientation banner"');
  });

  it("renders feature count in the banner", () => {
    const html = renderToString(
      createElement(GuidedOrientationBanner, {
        sprintCount: 5,
        featureCount: 12,
      }),
    );
    expect(html).toContain('data-testid="banner-feature-count"');
    expect(html).toContain(">12<");
  });

  it("renders sprint count in the banner", () => {
    const html = renderToString(
      createElement(GuidedOrientationBanner, {
        sprintCount: 5,
        featureCount: 12,
      }),
    );
    expect(html).toContain('data-testid="banner-sprint-count"');
    expect(html).toContain(">5<");
  });

  it("renders orientation label when not quieted", () => {
    const html = renderToString(
      createElement(GuidedOrientationBanner, {
        sprintCount: 5,
        featureCount: 12,
      }),
    );
    expect(html).toContain("orientation");
    expect(html).toContain('data-quieted="false"');
  });

  it("renders quieted state with minimal content", () => {
    const html = renderToString(
      createElement(GuidedOrientationBanner, {
        sprintCount: 5,
        featureCount: 12,
        quieted: true,
      }),
    );
    expect(html).toContain('data-quieted="true"');
    expect(html).toContain("sprint 5 of the product");
  });

  it("quieted state does not include the full orientation text", () => {
    const html = renderToString(
      createElement(GuidedOrientationBanner, {
        sprintCount: 5,
        featureCount: 12,
        quieted: true,
      }),
    );
    expect(html).not.toContain("you are the user");
  });
});

describe("PM-6-5: Sprint 5 — ProductCompletenessSignal", () => {
  it("renders without error", () => {
    const html = renderToString(
      createElement(ProductCompletenessSignal, {
        featureCount: 12,
        testsPassing: 100,
        sprintCount: 5,
      }),
    );
    expect(html).toBeTruthy();
  });

  it("renders the component landmark", () => {
    const html = renderToString(
      createElement(ProductCompletenessSignal, {
        featureCount: 12,
        testsPassing: 100,
        sprintCount: 5,
      }),
    );
    expect(html).toContain('data-testid="product-completeness-signal"');
  });

  it("renders feature count value", () => {
    const html = renderToString(
      createElement(ProductCompletenessSignal, {
        featureCount: 12,
        testsPassing: 100,
        sprintCount: 5,
      }),
    );
    expect(html).toContain('data-testid="completeness-features"');
    expect(html).toContain(">12<");
  });

  it("renders tests passing value as percentage", () => {
    const html = renderToString(
      createElement(ProductCompletenessSignal, {
        featureCount: 12,
        testsPassing: 100,
        sprintCount: 5,
      }),
    );
    expect(html).toContain('data-testid="completeness-tests"');
    expect(html).toContain("100%");
  });

  it("renders sprint count value", () => {
    const html = renderToString(
      createElement(ProductCompletenessSignal, {
        featureCount: 12,
        testsPassing: 100,
        sprintCount: 5,
      }),
    );
    expect(html).toContain('data-testid="completeness-sprints"');
    expect(html).toContain(">5<");
  });

  it("renders the completeness label", () => {
    const html = renderToString(
      createElement(ProductCompletenessSignal, {
        featureCount: 12,
        testsPassing: 100,
        sprintCount: 5,
      }),
    );
    expect(html).toContain("completeness signal");
  });
});

describe("PM-6-5: Sprint 5 — Navigable Surface Index (/surfaces)", () => {
  it("renders without error", async () => {
    const tree = await SurfacesPage();
    const html = renderToString(tree);
    expect(html).toBeTruthy();
  });

  it("renders the page heading", async () => {
    const tree = await SurfacesPage();
    const html = renderToString(tree);
    expect(html).toContain("Navigable Surface Index");
  });

  it("renders the surface list", async () => {
    const tree = await SurfacesPage();
    const html = renderToString(tree);
    expect(html).toContain('data-testid="surface-list"');
  });

  it("includes a link to the dashboard", async () => {
    const tree = await SurfacesPage();
    const html = renderToString(tree);
    expect(html).toContain('data-testid="surface-link-home"');
    expect(html).toContain('href="/"');
  });

  it("includes a link to /presence", async () => {
    const tree = await SurfacesPage();
    const html = renderToString(tree);
    expect(html).toContain('data-testid="surface-link-presence"');
    expect(html).toContain('href="/presence"');
  });

  it("renders feature count from getAllMetrics()", async () => {
    const tree = await SurfacesPage();
    const html = renderToString(tree);
    expect(html).toContain('data-testid="surfaces-feature-count"');
    expect(html).toContain(">12<");
  });

  it("renders sprint count from getAllMetrics()", async () => {
    const tree = await SurfacesPage();
    const html = renderToString(tree);
    expect(html).toContain('data-testid="surfaces-sprint-count"');
    expect(html).toContain(">5<");
  });
});
