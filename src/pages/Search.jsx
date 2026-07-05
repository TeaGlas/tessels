import { useState } from "react";
import { searchRecipes } from "../lib/data.js";
import { useLanguage } from "../context/LanguageContext.jsx";
import SearchBar from "../components/SearchBar.jsx";
import RecipeCard from "../components/RecipeCard.jsx";

const SUGGESTION_CATEGORIES = ["breakfast", "lunch", "dinner", "baking & desserts"];

export default function Search() {
  const { lang, t, tCategory } = useLanguage();
  const [query, setQuery] = useState("");
  const results = searchRecipes(query, lang);
  const suggestions = SUGGESTION_CATEGORIES.map((c) => tCategory(c));

  return (
    <main id="main" className="page-enter container py-12">
      <h1 className="font-display text-[34px] font-bold text-sage-900 md:text-[44px]">{t("searchTitle")}</h1>

      <div className="mt-6 max-w-xl">
        <SearchBar value={query} onChange={setQuery} suggestions={suggestions} />
      </div>

      <p className="mt-6 text-[15px] font-semibold text-muted">
        {query.trim() ? t("searchCountQuery", results.length, query) : t("searchCountEmpty", results.length)}
      </p>

      {query.trim() && results.length === 0 ? (
        <div className="mt-16 flex flex-col items-center gap-1 text-center">
          <p className="font-display text-xl font-bold text-sage-900">{t("searchNoResultsTitle")}</p>
          <p className="text-[15px] text-muted">{t("searchNoResultsBody")}</p>
        </div>
      ) : (
        <div className="mt-8 flex flex-col gap-4">
          {results.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} variant="search" />
          ))}
        </div>
      )}
    </main>
  );
}
