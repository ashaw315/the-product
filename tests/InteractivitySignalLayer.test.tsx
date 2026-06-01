import { describe, it, expect } from "vitest";
import { renderToString } from "react-dom/server";
import { createElement } from "react";
import { InteractivitySignalLayer } from "../app/components/InteractivitySignalLayer";

describe("PM-3-4: InteractivitySignalLayer", () => {
  it("component renders without error", () => {
    const html = renderToString(
      createElement(InteractivitySignalLayer, null, "test content")
    );
    expect(html).toBeDefined();
  });

  it("hover-state CSS class is present in rendered output when in active state", () => {
    const html = renderToString(
      createElement(
        InteractivitySignalLayer,
        { isActive: true },
        "test content"
      )
    );
    expect(html).toContain("signal-active");
  });

  it("idle-state class is present when not in active state", () => {
    const html = renderToString(
      createElement(
        InteractivitySignalLayer,
        { isActive: false },
        "test content"
      )
    );
    expect(html).toContain("signal-idle");
    expect(html).not.toContain("signal-active");
  });
});
