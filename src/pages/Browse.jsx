import { useState } from "react";
import { CATEGORIES, getByCategory } from "../lib/data.js";
import { useLanguage } from "../context/LanguageContext.jsx";
import CategoryFilter from "../components/CategoryFilter.jsx";
import RecipeCard from "../components/RecipeCard.jsx";

export default function Browse() {
  const { lang, t } = useLanguage();
  const [active, setActive] = useState("all");
  const recipes = getByCategory(active, lang);

  return (
    <main id="main" className="page-enter container py-12">
      <h1 className="font-display text-[34px] font-bold text-sage-900 md:text-[44px]">{t("browseTitle")}</h1>
      <p className="mt-2 text-[17px] text-muted">{t("browseCount", recipes.length)}</p>

      <div className="mt-6">
        <CategoryFilter categories={CATEGORIES} active={active} onChange={setActive} />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} variant="grid" />
        ))}
      </div>
    </main>
  );
}
