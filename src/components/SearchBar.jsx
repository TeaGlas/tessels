import { useLanguage } from "../context/LanguageContext.jsx";

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
      <line x1="21" y1="21" x2="16.5" y2="16.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function SearchBar({ value, onChange, suggestions = [] }) {
  const { t } = useLanguage();

  return (
    <div>
      <label htmlFor="recipe-search" className="sr-only">
        {t("searchInputLabel")}
      </label>
      <div className="flex items-center gap-3 rounded-pill border border-line bg-white px-5 py-3.5 text-sage-700">
        <SearchIcon />
        <input
          id="recipe-search"
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={t("searchPlaceholder")}
          className="w-full bg-transparent text-[16px] text-ink placeholder:text-muted focus:outline-none"
        />
      </div>

      {suggestions.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {suggestions.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => onChange(s)}
              className="rounded-pill border border-line bg-white px-4 py-1.5 text-[14px] font-semibold text-sage-700 transition hover:border-sage-500"
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
