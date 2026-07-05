import { useLanguage } from "../context/LanguageContext.jsx";

export default function UnitToggle({ value, onChange }) {
  const { t } = useLanguage();
  const options = [
    { value: "metric", label: t("unitMetric") },
    { value: "us", label: t("unitCups") },
  ];

  return (
    <div role="group" aria-label={t("unitsLabel")} className="inline-flex rounded-pill bg-white/15 p-1">
      {options.map((opt) => {
        const active = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(opt.value)}
            className={`rounded-pill px-3.5 py-1.5 text-[13px] font-semibold transition ${
              active ? "bg-white text-sage-700" : "text-white/85 hover:text-white"
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
