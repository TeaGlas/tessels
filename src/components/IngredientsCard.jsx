import { useState } from "react";
import UnitToggle from "./UnitToggle.jsx";
import IngredientItem from "./IngredientItem.jsx";
import { formatQuantity, scale } from "../lib/quantity.js";
import { useLanguage } from "../context/LanguageContext.jsx";

export default function IngredientsCard({ groups, servings, baseServings, unit, onUnitChange }) {
  const { t, tUnit } = useLanguage();
  const [checked, setChecked] = useState(() => new Set());
  const factor = scale(baseServings, servings);

  function toggle(key) {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  return (
    <div className="rounded-lg bg-sage-500 p-6 text-white">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-display text-[22px] font-bold">{t("ingredientsTitle")}</h2>
        <UnitToggle value={unit} onChange={onUnitChange} />
      </div>
      <p className="mt-2 text-[13px] text-white/70">{t("ingredientsHelper")}</p>

      <div className="mt-5 flex flex-col gap-6">
        {groups.map((group) => (
          <div key={group.name}>
            <h3 className="text-[13px] font-bold uppercase tracking-wide text-white/80">{group.name}</h3>
            <div className="mt-2 flex flex-col">
              {group.items.map((item) => {
                const key = `${group.name}:${item.name}`;
                return (
                  <IngredientItem
                    key={key}
                    text={formatQuantity(item, unit, factor, tUnit)}
                    checked={checked.has(key)}
                    onToggle={() => toggle(key)}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
