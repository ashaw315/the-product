import { describe, it, expect } from "vitest";
import { renderToString } from "react-dom/server";
import { createElement } from "react";
import { ArrivalSignalLink } from "../app/components/ArrivalSignalLink";

describe("PM-11-6: ArrivalSignalLink", () => {
  it("renders without crashing", () => {
    const html = renderToString(createElement(ArrivalSignalLink));
    expect(html).toBeTruthy();
  });

  it("renders a link to '/arrival'", () => {
    const html = renderToString(createElement(ArrivalSignalLink));
    expect(html).toContain('href="/arrival"');
  });

  it("renders the exact link text 'Something showed up.'", () => {
    const html = renderToString(createElement(ArrivalSignalLink));
    expect(html).toContain("Something showed up.");
  });
});
