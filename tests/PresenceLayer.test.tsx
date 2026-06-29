import { describe, it, expect } from "vitest";
import { renderToString } from "react-dom/server";
import { createElement } from "react";
import PresenceLayer from "../app/components/PresenceLayer";

describe("PM-7-6: PresenceLayer component", () => {
  it("renders without error", () => {
    const html = renderToString(
      createElement(PresenceLayer, { engagement: 42, sprintCount: 7 }),
    );
    expect(html).toBeTruthy();
  });

  it("renders the presence-layer testid", () => {
    const html = renderToString(
      createElement(PresenceLayer, { engagement: 42, sprintCount: 7 }),
    );
    expect(html).toContain('data-testid="presence-layer"');
  });

  it("renders the engagement value", () => {
    const html = renderToString(
      createElement(PresenceLayer, { engagement: 42, sprintCount: 7 }),
    );
    expect(html).toContain('data-testid="presence-engagement"');
    expect(html).toContain("42");
  });

  it("renders the sprint count value", () => {
    const html = renderToString(
      createElement(PresenceLayer, { engagement: 42, sprintCount: 7 }),
    );
    expect(html).toContain('data-testid="presence-sprint-count"');
    expect(html).toContain("7");
  });
});
