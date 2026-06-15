// @vitest-environment jsdom
import { describe, it, expect, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { createElement } from "react";
import {
  DiscoveryRibbon,
  DISCOVERY_ENTRIES,
} from "../app/components/DiscoveryRibbon";

afterEach(() => {
  cleanup();
});

describe("PM-5-3: DiscoveryRibbon", () => {
  it("renders the first entry on initial render", () => {
    render(createElement(DiscoveryRibbon, {}));
    expect(screen.getByTestId("ribbon-entry-name").textContent).toBe(
      DISCOVERY_ENTRIES[0].name,
    );
    expect(screen.getByTestId("ribbon-entry-desc").textContent).toBe(
      DISCOVERY_ENTRIES[0].description,
    );
  });

  it("shows the second entry after clicking next", () => {
    render(createElement(DiscoveryRibbon, {}));
    const nextBtn = screen.getByLabelText("next feature");
    fireEvent.click(nextBtn);
    expect(screen.getByTestId("ribbon-entry-name").textContent).toBe(
      DISCOVERY_ENTRIES[1].name,
    );
  });

  it("wraps to the last entry when clicking previous from the first entry", () => {
    render(createElement(DiscoveryRibbon, {}));
    const prevBtn = screen.getByLabelText("previous feature");
    fireEvent.click(prevBtn);
    expect(screen.getByTestId("ribbon-entry-name").textContent).toBe(
      DISCOVERY_ENTRIES[DISCOVERY_ENTRIES.length - 1].name,
    );
  });

  it("contains at least eight entries in its static list", () => {
    expect(DISCOVERY_ENTRIES.length).toBeGreaterThanOrEqual(8);
  });
});
