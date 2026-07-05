import rawRecipes from "../data/recipes.json";
import { translateCategory } from "./i18n.js";

function pick(field, lang) {
  if (field == null) return field;
  if (typeof field === "object" && ("en" in field || "nl" in field)) {
    return field[lang] ?? field.en;
  }
  return field;
}

/** Flatten a recipe's { en, nl } fields into plain strings for the given language.
 *  Leaves language-independent fields (category, ids, quantities, etc.) untouched. */
function localizeRecipe(recipe, lang) {
  return {
    ...recipe,
    title: pick(recipe.title, lang),
    blurb: pick(recipe.blurb, lang),
    prep: pick(recipe.prep, lang),
    cook: pick(recipe.cook, lang),
    totalTime: pick(recipe.totalTime, lang),
    servingNoun: pick(recipe.servingNoun, lang),
    nutrition: recipe.nutrition?.map((n) => ({ ...n, label: pick(n.label, lang) })),
    ingredientGroups: recipe.ingredientGroups?.map((group) => ({
      ...group,
      name: pick(group.name, lang),
      items: group.items.map((item) => ({ ...item, name: pick(item.name, lang) })),
    })),
    instructions: recipe.instructions?.map((section) => ({
      ...section,
      group: pick(section.group, lang),
      steps: section.steps.map((step) => pick(step, lang)),
    })),
  };
}

export function getRecipes(lang = "en") {
  return rawRecipes.map((r) => localizeRecipe(r, lang));
}

export function getRecipe(slug, lang = "en") {
  const recipe = rawRecipes.find((r) => r.slug === slug);
  return recipe ? localizeRecipe(recipe, lang) : undefined;
}

export function getFeatured(lang = "en") {
  return rawRecipes.filter((r) => r.featured === true).map((r) => localizeRecipe(r, lang));
}

export function getByCategory(category, lang = "en") {
  let matches = rawRecipes;
  if (category === "basics") matches = rawRecipes.filter((r) => r.isBasic === true);
  else if (category !== "all") matches = rawRecipes.filter((r) => r.category === category);
  return matches.map((r) => localizeRecipe(r, lang));
}

export function searchRecipes(query, lang = "en") {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return rawRecipes
    .filter((r) => {
      const localized = localizeRecipe(r, lang);
      return (
        localized.title.toLowerCase().includes(q) ||
        localized.category.toLowerCase().includes(q) ||
        translateCategory(r.category, lang).toLowerCase().includes(q) ||
        localized.blurb.toLowerCase().includes(q)
      );
    })
    .map((r) => localizeRecipe(r, lang));
}

export function getBasics(lang = "en") {
  return rawRecipes.filter((r) => r.isBasic === true).map((r) => localizeRecipe(r, lang));
}

export function getBasicsByCategory(category, lang = "en") {
  const basics = rawRecipes.filter((r) => r.isBasic === true);
  const matches = category === "all" ? basics : basics.filter((r) => r.category === category);
  return matches.map((r) => localizeRecipe(r, lang));
}

// Only the categories actually used by basics items — not the full site-wide
// list — since the Basics page filters within that smaller set.
export function getBasicsCategories() {
  const categories = Array.from(new Set(rawRecipes.filter((r) => r.isBasic === true).map((r) => r.category)));
  return ["all", ...categories];
}

export const CATEGORIES = ["all", "breakfast", "lunch", "dinner", "baking & desserts", "basics"];
