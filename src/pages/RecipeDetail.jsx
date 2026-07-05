import { useMemo, useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { getRecipe, getRecipes } from "../lib/data.js";
import { useLanguage } from "../context/LanguageContext.jsx";
import ImagePlaceholder from "../components/ImagePlaceholder.jsx";
import Chip from "../components/Chip.jsx";
import TimeChip from "../components/TimeChip.jsx";
import ServingsStepper from "../components/ServingsStepper.jsx";
import NutritionStrip from "../components/NutritionStrip.jsx";
import IngredientsCard from "../components/IngredientsCard.jsx";
import RecipeCard from "../components/RecipeCard.jsx";
import Instructions from "../components/Instructions.jsx";

const SHOW_NUTRITION = true;

export default function RecipeDetail() {
  const { slug } = useParams();
  const { lang, t, tCategory } = useLanguage();
  const recipe = getRecipe(slug, lang);
  const [servings, setServings] = useState(recipe?.baseServings ?? 1);
  const [unit, setUnit] = useState("metric");

  const others = useMemo(() => {
    if (!recipe) return [];
    const pool = getRecipes(lang).filter((r) => r.id !== recipe.id);
    // Prefer other items from the same group (basics with basics, recipes
    // with recipes) so a technique's rail doesn't lead with an unrelated dinner.
    const sameGroup = pool.filter((r) => Boolean(r.isBasic) === Boolean(recipe.isBasic));
    const rest = pool.filter((r) => Boolean(r.isBasic) !== Boolean(recipe.isBasic));
    return [...sameGroup, ...rest].slice(0, 3);
  }, [recipe, lang]);

  if (!recipe) return <Navigate to="/recipes" replace />;

  const isTechnique = recipe.type === "technique";
  const otherHeading = recipe.isBasic ? t("otherBasics") : t("otherRecipes");

  return (
    <main id="main" className="page-enter container py-10">
      <Link to="/recipes" className="text-[14px] font-semibold text-sage-700 hover:underline">
        {t("backToRecipes")}
      </Link>

      <div className="mt-6 grid grid-cols-1 items-center gap-10 md:grid-cols-2">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Chip tone="mint">{tCategory(recipe.category)}</Chip>
            {isTechnique && <TimeChip time={recipe.totalTime} />}
          </div>
          <h1 className="mt-3 font-display text-[34px] font-bold leading-[1.03] text-sage-900 md:text-[46px]">
            {recipe.title}
          </h1>
          <p className="mt-3 max-w-[46ch] text-[17px] text-muted md:text-[19px]">{recipe.blurb}</p>

          {!isTechnique && (
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
              <div className="rounded-lg border border-line bg-white px-4 py-3">
                <div className="text-[13px] font-semibold uppercase tracking-wide text-muted">{t("prep")}</div>
                <div className="mt-1 font-display text-lg font-bold text-sage-900">{recipe.prep}</div>
              </div>
              <div className="rounded-lg border border-line bg-white px-4 py-3">
                <div className="text-[13px] font-semibold uppercase tracking-wide text-muted">{t("cook")}</div>
                <div className="mt-1 font-display text-lg font-bold text-sage-900">{recipe.cook}</div>
              </div>
              <div className="col-span-2 rounded-lg border border-line bg-white px-4 py-3 sm:col-span-1">
                <ServingsStepper
                  value={servings}
                  onChange={setServings}
                  noun={recipe.servingNoun}
                />
              </div>
            </div>
          )}
        </div>

        <ImagePlaceholder src={recipe.image} alt={recipe.title} aspect="4:3" className="shadow-hero" />
      </div>

      {SHOW_NUTRITION && recipe.nutrition?.length > 0 && (
        <div className="mt-10">
          <NutritionStrip items={recipe.nutrition} />
        </div>
      )}

      {isTechnique ? (
        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <Instructions sections={recipe.instructions} />
          <div>
            <h2 className="font-display text-[22px] font-bold text-sage-900">{otherHeading}</h2>
            <div className="mt-4 flex flex-col gap-3">
              {others.map((r) => (
                <RecipeCard key={r.id} recipe={r} variant="compact" />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="recipe-body mt-10">
          <div className="ingredients-col">
            <IngredientsCard
              groups={recipe.ingredientGroups}
              servings={servings}
              baseServings={recipe.baseServings}
              unit={unit}
              onUnitChange={setUnit}
            />
          </div>

          <div className="instructions-col">
            <Instructions sections={recipe.instructions} />
          </div>

          <div className="other-col">
            <h2 className="font-display text-[22px] font-bold text-sage-900">{otherHeading}</h2>
            <div className="mt-4 flex flex-col gap-3">
              {others.map((r) => (
                <RecipeCard key={r.id} recipe={r} variant="compact" />
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
