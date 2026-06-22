import { describe, it, expect, vi } from "vitest";
import { renderToString } from "react-dom/server";

vi.mock("@/lib/product-metrics", () => ({
  getFeatureCount: vi.fn().mockResolvedValue(8),
  getVelocity: vi.fn().mockResolvedValue(5.5),
}));

import { AmbientOrientationSignal } from "../app/components/AmbientOrientationSignal";

async function renderSignal() {
  const tree = await AmbientOrientationSignal();
  return renderToString(tree);
}

describe("PM-6-2: AmbientOrientationSignal component", () => {
  it("renders without error", async () => {
    const html = await renderSignal();
    expect(html).toBeTruthy();
  });

  it("renders the orientation prompt element", async () => {
    const html = await renderSignal();
    expect(html).toContain('data-testid="orientation-prompt"');
  });

  it("renders featureCount value from getFeatureCount()", async () => {
    const html = await renderSignal();
    expect(html).toContain('data-testid="orientation-feature-count"');
    expect(html).toContain(">8<");
  });

  it("renders velocity value from getVelocity()", async () => {
    const html = await renderSignal();
    expect(html).toContain('data-testid="orientation-velocity"');
    expect(html).toContain("5.5");
  });

  it("incorporates both metric values in the orientation prompt", async () => {
    const html = await renderSignal();
    expect(html).toContain("8"); // featureCount
    expect(html).toContain("5.5"); // velocity
  });

  it("renders the section with aria-label for accessibility", async () => {
    const html = await renderSignal();
    expect(html).toContain('aria-label="ambient orientation signal"');
  });

  it("includes the orientation label", async () => {
    const html = await renderSignal();
    expect(html).toContain("orientation");
  });

  it("includes a message about intentional behavior", async () => {
    const html = await renderSignal();
    expect(html).toContain("intentional");
  });
});
