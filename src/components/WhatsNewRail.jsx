import { useEffect, useRef, useState } from "react";
import RecipeCard from "./RecipeCard.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";

const GLIDE_MS = 1100;
const CARD_GRID = "grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3";

function windowFrom(recipes, start, size) {
  return Array.from({ length: Math.min(size, recipes.length) }, (_, i) => recipes[(start + i) % recipes.length]);
}

function CardGrid({ recipes }) {
  return (
    <div className={CARD_GRID}>
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} variant="onSage" />
      ))}
    </div>
  );
}

export default function WhatsNewRail({ recipes }) {
  const { t } = useLanguage();
  const [start, setStart] = useState(0);
  const [outgoing, setOutgoing] = useState(null); // { cards, direction }
  const outgoingTimeout = useRef(null);
  const windowSize = 3;

  const prefersReducedMotion =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => () => clearTimeout(outgoingTimeout.current), []);

  if (!recipes.length) return null;

  function shift(direction) {
    // Page by a full set of `windowSize` recipes so every click reveals an
    // entirely new page, instead of a rolling window that repeats 2 of 3 cards.
    const step = direction * windowSize;
    if (prefersReducedMotion) {
      setStart((s) => (s + step + recipes.length) % recipes.length);
      return;
    }
    setOutgoing({ cards: windowFrom(recipes, start, windowSize), direction: direction > 0 ? "next" : "prev" });
    clearTimeout(outgoingTimeout.current);
    outgoingTimeout.current = setTimeout(() => setOutgoing(null), GLIDE_MS);
    setStart((s) => (s + step + recipes.length) % recipes.length);
  }

  const visible = windowFrom(recipes, start, windowSize);

  return (
    <section>
      <div className="flex items-center justify-between gap-4">
        <h2 className="font-display text-[26px] font-bold text-sage-900 md:text-[30px]">{t("whatsNew")}</h2>
        {recipes.length > windowSize && (
          <div className="flex gap-2">
            <button
              type="button"
              aria-label={t("whatsNewPrev")}
              onClick={() => shift(-1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-sage-700 transition hover:bg-mint"
            >
              ‹
            </button>
            <button
              type="button"
              aria-label={t("whatsNewNext")}
              onClick={() => shift(1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-sage-700 transition hover:bg-mint"
            >
              ›
            </button>
          </div>
        )}
      </div>

      {/* While transitioning, the old and new card sets sit side by side in one
          double-wide track; the track slides by half its width so the old set
          glides fully out of view as the new set glides fully in. */}
      <div className="slide-viewport mt-6">
        {outgoing ? (
          <div className={`slide-track ${outgoing.direction === "next" ? "slide-track-next" : "slide-track-prev"}`}>
            {outgoing.direction === "next" ? (
              <>
                <div className="slide-pane">
                  <CardGrid recipes={outgoing.cards} />
                </div>
                <div className="slide-pane">
                  <CardGrid recipes={visible} />
                </div>
              </>
            ) : (
              <>
                <div className="slide-pane">
                  <CardGrid recipes={visible} />
                </div>
                <div className="slide-pane">
                  <CardGrid recipes={outgoing.cards} />
                </div>
              </>
            )}
          </div>
        ) : (
          <CardGrid recipes={visible} />
        )}
      </div>
    </section>
  );
}
