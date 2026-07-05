const FRACTIONS = [
  { value: 1 / 8, glyph: "⅛" },
  { value: 1 / 4, glyph: "¼" },
  { value: 1 / 3, glyph: "⅓" },
  { value: 3 / 8, glyph: "⅜" },
  { value: 1 / 2, glyph: "½" },
  { value: 5 / 8, glyph: "⅝" },
  { value: 2 / 3, glyph: "⅔" },
  { value: 3 / 4, glyph: "¾" },
  { value: 7 / 8, glyph: "⅞" },
];

/** Compute the servings scale factor, clamped to 1…24. */
export function scale(baseServings, currentServings) {
  const clamped = Math.min(24, Math.max(1, currentServings));
  return clamped / baseServings;
}

/** Convert a decimal quantity to a mixed number using common cooking fractions. */
export function frac(value) {
  if (value <= 0) return "0";

  const whole = Math.floor(value);
  const remainder = value - whole;

  if (remainder < 1 / 16) {
    return whole === 0 ? "0" : String(whole);
  }

  let best = { glyph: null, distance: 1 - remainder }; // candidate: round up to next whole
  for (const f of FRACTIONS) {
    const distance = Math.abs(remainder - f.value);
    if (distance < best.distance) {
      best = { glyph: f.glyph, distance };
    }
  }

  if (best.glyph === null) {
    return String(whole + 1);
  }
  return whole > 0 ? `${whole}${best.glyph}` : best.glyph;
}

/** Round a metric mass/volume value per the house rounding rules. */
export function roundMetric(value) {
  let rounded;
  if (value < 10) {
    rounded = Math.round(value * 2) / 2;
  } else if (value < 50) {
    rounded = Math.round(value);
  } else {
    rounded = Math.round(value / 5) * 5;
  }
  return rounded % 1 === 0 ? String(rounded) : String(rounded);
}

/** Format one ingredient line: quantity + unit + name, scaled and unit-converted.
 *  `unitLabel` translates the raw unit key (e.g. "tbsp") for display; defaults
 *  to the identity function so callers that don't care about language still work. */
export function formatQuantity(item, unit, factor, unitLabel = (u) => u) {
  const source = unit === "metric" ? item.metric : item.us;
  const scaled = source.v * factor;

  if (source.u === "") {
    return `${frac(scaled)} ${item.name}`.trim();
  }

  const label = unitLabel(source.u);

  if (unit === "metric") {
    return `${roundMetric(scaled)} ${label} ${item.name}`.trim();
  }

  return `${frac(scaled)} ${label} ${item.name}`.trim();
}
