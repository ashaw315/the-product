import { describe, it, expect, vi } from "vitest";
import { renderToString } from "react-dom/server";
import { createElement } from "react";

vi.mock("@/lib/product-metrics", () => ({}));

import StillnessPage from "../app/stillness/page";

describe("PM-9-4 / PM-9-5: Stillness Surface", () => {
  it("renders without error", () => {
    const html = renderToString(createElement(StillnessPage, {}));
    expect(html).toBeTruthy();
  });

  it("key prose content is present", () => {
    const html = renderToString(createElement(StillnessPage, {}));
    expect(html).toContain("stillness");
    expect(html).toContain("quiet modality");
  });

  it("internal navigation link to '/' is present", () => {
    const html = renderToString(createElement(StillnessPage, {}));
    expect(html).toContain('href="/"');
  });

  it("link to /returns is present with correct href", () => {
    const html = renderToString(createElement(StillnessPage, {}));
    expect(html).toContain('href="/returns"');
  });
});
