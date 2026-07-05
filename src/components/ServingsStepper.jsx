import { useLanguage } from "../context/LanguageContext.jsx";

export default function ServingsStepper({ value, min = 1, max = 24, onChange, noun = "serves" }) {
  const { t } = useLanguage();
  const atMin = value <= min;
  const atMax = value >= max;

  return (
    <div className="flex flex-col items-start gap-1">
      <span className="text-[10px] font-semibold uppercase tracking-wide text-muted lg:text-[13px]">{noun}</span>
      <div className="flex items-center gap-1.5 lg:gap-3">
        <button
          type="button"
          aria-label={t("decreaseServings")}
          disabled={atMin}
          onClick={() => onChange(Math.max(min, value - 1))}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line text-sm font-bold text-sage-700 transition disabled:cursor-not-allowed disabled:opacity-40 enabled:hover:bg-mint lg:h-9 lg:w-9 lg:text-lg"
        >
          −
        </button>
        <span className="min-w-[1.5ch] text-center font-display text-base font-bold text-sage-900 lg:text-xl">{value}</span>
        <button
          type="button"
          aria-label={t("increaseServings")}
          disabled={atMax}
          onClick={() => onChange(Math.min(max, value + 1))}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line text-sm font-bold text-sage-700 transition disabled:cursor-not-allowed disabled:opacity-40 enabled:hover:bg-mint lg:h-9 lg:w-9 lg:text-lg"
        >
          +
        </button>
      </div>
    </div>
  );
}
