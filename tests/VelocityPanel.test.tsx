import { describe, it, expect } from "vitest";
import { renderToString } from "react-dom/server";
import { createElement } from "react";
import { VelocityPanel } from "../app/components/VelocityPanel";

describe("PM-2-6: VelocityPanel", () => {
  it("renders the mocked getVelocity value", () => {
    const html = renderToString(
      createElement(VelocityPanel, { currentVelocity: 6.5, delta: 6.5 }),
    );
    expect(html).toContain("6.5");
  });

  it("renders Sprint-over-Sprint display elements", () => {
    const html = renderToString(
      createElement(VelocityPanel, { currentVelocity: 6.5, delta: 6.5 }),
    );
    expect(html).toContain("Sprint-over-Sprint Momentum");
    expect(html).toContain("Sprint Velocity");
  });

  it("renders upward delta correctly", () => {
    const html = renderToString(
      createElement(VelocityPanel, { currentVelocity: 6.5, delta: 6.5 }),
    );
    expect(html).toContain('data-direction="up"');
    expect(html).toContain("+6.5");
  });

  it("renders neutral delta when delta is 0", () => {
    const html = renderToString(
      createElement(VelocityPanel, { currentVelocity: 0, delta: 0 }),
    );
    expect(html).toContain('data-direction="flat"');
  });

  it("renders downward delta correctly", () => {
    const html = renderToString(
      createElement(VelocityPanel, { currentVelocity: 3, delta: -2 }),
    );
    expect(html).toContain('data-direction="down"');
  });
});
