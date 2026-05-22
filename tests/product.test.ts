import { describe, it, expect } from "vitest";
import { getUser, getNPSLiftIndex } from "../lib/product-metrics";

// The first assertions. They assert what they assert.
describe("the product", () => {
  it("the user is the user", () => {
    expect(getUser().name).toBe("the user");
  });

  it("the nps lift index is meaningful", () => {
    expect(getNPSLiftIndex()).toBeGreaterThan(0);
  });
});
