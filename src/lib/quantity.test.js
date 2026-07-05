import { describe, it, expect } from "vitest";
import { frac, roundMetric, formatQuantity, scale } from "./quantity.js";
import { translateUnit } from "./i18n.js";

describe("frac", () => {
  it("renders 3.75 as 3¾", () => {
    expect(frac(3.75)).toBe("3¾");
  });
  it("renders 0.875 as ⅞", () => {
    expect(frac(0.875)).toBe("⅞");
  });
  it("renders whole numbers with no fraction glyph", () => {
    expect(frac(4)).toBe("4");
  });
});

describe("roundMetric", () => {
  it("rounds values under 10 to nearest 0.5", () => {
    expect(Number(roundMetric(7.3))).toBe(7.5);
  });
  it("rounds values under 50 to nearest 1", () => {
    expect(Number(roundMetric(23.4))).toBe(23);
  });
  it("rounds values 50+ to nearest 5", () => {
    expect(roundMetric(469)).toBe("470");
  });
});

describe("formatQuantity", () => {
  const cupsItem = { name: "plain flour", us: { v: 3.75, u: "cups" }, metric: { v: 469, u: "g" } };
  const fractionCupsItem = { name: "chilli oil", us: { v: 0.875, u: "cups" }, metric: { v: 210, u: "ml" } };
  const countItem = { name: "chicken breasts, cut into bite-size chunks", us: { v: 4, u: "" }, metric: { v: 4, u: "" } };

  it("formats cups as a mixed fraction", () => {
    expect(formatQuantity(cupsItem, "us", 1)).toBe("3¾ cups plain flour");
  });
  it("formats a pure-fraction cup quantity", () => {
    expect(formatQuantity(fractionCupsItem, "us", 1)).toBe("⅞ cups chilli oil");
  });
  it("formats metric mass rounded", () => {
    expect(formatQuantity(cupsItem, "metric", 1)).toBe("470 g plain flour");
  });
  it("formats a whole count with no unit", () => {
    expect(formatQuantity(countItem, "us", 1)).toBe("4 chicken breasts, cut into bite-size chunks");
  });
  it("scales a servings change (6 servings from a base of 4)", () => {
    const factor = scale(4, 6);
    expect(factor).toBe(1.5);
    expect(formatQuantity(cupsItem, "metric", factor)).toBe("705 g plain flour");
  });
  it("translates the unit label when a translator is passed (Dutch tbsp -> el)", () => {
    const tbspItem = { name: "honing", us: { v: 2, u: "tbsp" }, metric: { v: 42, u: "g" } };
    const nlUnit = (u) => translateUnit(u, "nl");
    expect(formatQuantity(tbspItem, "us", 1, nlUnit)).toBe("2 el honing");
  });
});
