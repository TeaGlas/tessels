import { useLanguage } from "../context/LanguageContext.jsx";

export default function CategoryFilter({ categories, active, onChange }) {
  const { t, tCategory } = useLanguage();

  return (
    <div role="group" aria-label={t("categoryFilterLabel")} className="flex flex-wrap gap-2">
      {categories.map((cat) => {
        const isActive = cat === active;
        return (
          <button
            key={cat}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(cat)}
            className={`rounded-pill px-4 py-2 text-[14px] font-semibold transition ${
              isActive
                ? "bg-sage-500 text-white"
                : "border border-line bg-white text-sage-700 hover:border-sage-500"
            }`}
          >
            {tCategory(cat)}
          </button>
        );
      })}
    </div>
  );
}
