// All static UI copy, keyed by language. Recipe content lives in recipes.json
// as { en, nl } pairs and is resolved separately via lib/data.js.
export const UI = {
  en: {
    navHome: "Home",
    navRecipes: "Recipes",
    navBasics: "Basics",
    navSearchLabel: "Search",
    navMenuLabel: "Open menu",
    langSwitchLabel: "Switch to Dutch",

    footerTagline: "Simple recipes, no life stories.",

    heroEyebrow: "Featured recipe",
    heroViewRecipe: "View recipe",
    heroDotLabel: (title) => `Show featured recipe: ${title}`,

    whatsNew: "What’s new?",
    whatsNewPrev: "Show previous recipes",
    whatsNewNext: "Show next recipes",

    browseTitle: "All recipes",
    browseCount: (n) => `${n} recipe${n === 1 ? "" : "s"}`,

    basicsTitle: "Basics",
    basicsCount: (n) => `${n} basic${n === 1 ? "" : "s"} — recipes and techniques, no life stories`,

    searchTitle: "Search",
    searchPlaceholder: "Search recipes, ingredients, categories…",
    searchInputLabel: "Search recipes",
    searchCountQuery: (n, q) => `${n} results for "${q}"`,
    searchCountEmpty: (n) => `${n} recipes`,
    searchNoResultsTitle: "No recipes found",
    searchNoResultsBody: "Try a different dish, ingredient, or category.",

    backToRecipes: "← All recipes",
    prep: "Prep",
    cook: "Cook",
    otherRecipes: "Other recipes",
    otherBasics: "Other basics",

    ingredientsTitle: "Ingredients",
    ingredientsHelper: "Tap an item to check it off · quantities scale with servings.",
    unitsLabel: "Units",
    unitMetric: "Metric",
    unitCups: "Cups",

    decreaseServings: "Decrease servings",
    increaseServings: "Increase servings",

    categoryFilterLabel: "Filter by category",
  },
  nl: {
    navHome: "Home",
    navRecipes: "Recepten",
    navBasics: "Basis",
    navSearchLabel: "Zoeken",
    navMenuLabel: "Menu openen",
    langSwitchLabel: "Overschakelen naar Engels",

    footerTagline: "Simpele recepten, geen levensverhalen.",

    heroEyebrow: "Uitgelicht recept",
    heroViewRecipe: "Bekijk recept",
    heroDotLabel: (title) => `Toon uitgelicht recept: ${title}`,

    whatsNew: "Nieuw binnen",
    whatsNewPrev: "Toon vorige recepten",
    whatsNewNext: "Toon volgende recepten",

    browseTitle: "Alle recepten",
    browseCount: (n) => `${n} recept${n === 1 ? "" : "en"}`,

    basicsTitle: "Basis",
    basicsCount: (n) => `${n} basisrecept${n === 1 ? "" : "en"} — recepten en technieken, geen levensverhalen`,

    searchTitle: "Zoeken",
    searchPlaceholder: "Zoek recepten, ingrediënten, categorieën…",
    searchInputLabel: "Zoek recepten",
    searchCountQuery: (n, q) => `${n} resultaten voor "${q}"`,
    searchCountEmpty: (n) => `${n} recepten`,
    searchNoResultsTitle: "Geen recepten gevonden",
    searchNoResultsBody: "Probeer een ander gerecht, ingrediënt of categorie.",

    backToRecipes: "← Alle recepten",
    prep: "Voorbereiding",
    cook: "Bereiding",
    otherRecipes: "Andere recepten",
    otherBasics: "Andere basisrecepten",

    ingredientsTitle: "Ingrediënten",
    ingredientsHelper: "Tik op een ingrediënt om het af te vinken · hoeveelheden schalen mee met het aantal porties.",
    unitsLabel: "Eenheden",
    unitMetric: "Metrisch",
    unitCups: "Cups",

    decreaseServings: "Minder porties",
    increaseServings: "Meer porties",

    categoryFilterLabel: "Filter op categorie",
  },
};

// Internal category keys stay in English everywhere (filtering, state, URLs);
// only the displayed label is translated.
export const CATEGORY_LABELS = {
  all: { en: "all", nl: "alles" },
  breakfast: { en: "breakfast", nl: "ontbijt" },
  lunch: { en: "lunch", nl: "lunch" },
  dinner: { en: "dinner", nl: "diner" },
  "baking & desserts": { en: "baking & desserts", nl: "bakken & desserts" },
  basics: { en: "basics", nl: "basis" },
  technique: { en: "technique", nl: "techniek" },
  essentials: { en: "essentials", nl: "basiskennis" },
};

// Ingredient unit abbreviations — a small, finite set shared across every
// recipe, so translating them here avoids duplicating unit strings per item.
export const UNIT_LABELS = {
  cups: { en: "cups", nl: "kopjes" },
  cup: { en: "cup", nl: "kopje" },
  tbsp: { en: "tbsp", nl: "el" },
  tsp: { en: "tsp", nl: "tl" },
  g: { en: "g", nl: "g" },
  ml: { en: "ml", nl: "ml" },
  cloves: { en: "cloves", nl: "teentjes" },
  loaf: { en: "loaf", nl: "brood" },
  oz: { en: "oz", nl: "oz" },
  lb: { en: "lb", nl: "lb" },
  "": { en: "", nl: "" },
};

export function t(lang, key, ...args) {
  const entry = (UI[lang] ?? UI.en)[key] ?? UI.en[key];
  return typeof entry === "function" ? entry(...args) : entry;
}

export function translateCategory(category, lang) {
  const entry = CATEGORY_LABELS[category];
  if (!entry) return category;
  return entry[lang] ?? entry.en;
}

export function translateUnit(unit, lang) {
  const entry = UNIT_LABELS[unit];
  if (!entry) return unit;
  return entry[lang] ?? entry.en;
}
