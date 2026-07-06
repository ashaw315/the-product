import { describe, it, expect } from "vitest";
import { renderToString } from "react-dom/server";
import { createElement } from "react";
import { ReturnAcknowledgmentSignal } from "../app/components/ReturnAcknowledgmentSignal";

describe("ReturnAcknowledgmentSignal (PM-8-2)", () => {
  it("renders a prose statement incorporating sprintCount", () => {
    const html = renderToString(
      createElement(ReturnAcknowledgmentSignal, {
        sprintCount: 3,
        featureCount: 7,
      }),
    );
    expect(html).toContain("3");
    expect(html).toContain("sprints");
  });

  it("renders a prose statement incorporating featureCount", () => {
    const html = renderToString(
      createElement(ReturnAcknowledgmentSignal, {
        sprintCount: 3,
        featureCount: 7,
      }),
    );
    expect(html).toContain("7");
    expect(html).toContain("features");
  });

  it("addresses the returning user", () => {
    const html = renderToString(
      createElement(ReturnAcknowledgmentSignal, {
        sprintCount: 1,
        featureCount: 5,
      }),
    );
    expect(html).toContain("you have returned");
  });

  it("renders with data-testid attribute", () => {
    const html = renderToString(
      createElement(ReturnAcknowledgmentSignal, {
        sprintCount: 2,
        featureCount: 4,
      }),
    );
    expect(html).toContain('data-testid="return-acknowledgment-signal"');
  });

  it("snapshot confirms renders without crashing with arbitrary numeric props", () => {
    const html = renderToString(
      createElement(ReturnAcknowledgmentSignal, {
        sprintCount: 99,
        featureCount: 500,
      }),
    );
    expect(html).toMatchSnapshot();
  });
});
