import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ImagePlaceholder from "./ImagePlaceholder.jsx";
import Chip from "./Chip.jsx";
import TimeChip from "./TimeChip.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";

const AUTO_ADVANCE_MS = 6500;
const GLIDE_MS = 1100;
const ROW_CLASS = "grid grid-cols-1 items-center gap-10 py-8 md:grid-cols-[0.86fr_1.14fr] md:py-12";

function HeroContent({ recipe }) {
  const { t, tCategory } = useLanguage();

  return (
    <>
      <div className="order-2 flex flex-col items-start gap-4 md:order-1">
        <span className="text-[13px] font-bold uppercase tracking-wide text-accent">{t("heroEyebrow")}</span>
        <h1 className="font-display text-[34px] font-bold leading-[1.02] text-sage-900 md:text-[52px]">
          {recipe.title}
        </h1>
        <p className="max-w-[30ch] text-[17px] text-muted md:text-[19px]">{recipe.blurb}</p>
        <div className="flex flex-wrap gap-2">
          <Chip tone="mint">{tCategory(recipe.category)}</Chip>
          <TimeChip time={recipe.totalTime} />
        </div>
        <Link
          to={`/recipes/${recipe.slug}`}
          className="mt-2 inline-flex items-center gap-2 rounded-btn bg-accent px-6 py-3 text-[15px] font-bold text-white transition hover:-translate-y-0.5"
        >
          {t("heroViewRecipe")} →
        </Link>
      </div>

      <div className="order-1 md:order-2">
        <ImagePlaceholder src={recipe.image} alt={recipe.title} aspect="4:3" className="shadow-hero" />
      </div>
    </>
  );
}

export default function HeroCarousel({ recipes }) {
  const { t } = useLanguage();
  const [index, setIndex] = useState(0);
  const [outgoing, setOutgoing] = useState(null); // { recipe, direction }
  const [paused, setPaused] = useState(false);
  const [rowHeight, setRowHeight] = useState(null);
  const timerRef = useRef(null);
  const outgoingTimeout = useRef(null);
  const measureRefs = useRef([]);
  const indexRef = useRef(index);
  indexRef.current = index;

  const prefersReducedMotion =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function beginTransition(nextIndex, direction) {
    const current = indexRef.current;
    if (nextIndex === current) return;
    if (prefersReducedMotion) {
      setIndex(nextIndex);
      return;
    }
    setOutgoing({ recipe: recipes[current], direction });
    clearTimeout(outgoingTimeout.current);
    outgoingTimeout.current = setTimeout(() => setOutgoing(null), GLIDE_MS);
    setIndex(nextIndex);
  }

  useEffect(() => () => clearTimeout(outgoingTimeout.current), []);

  useEffect(() => {
    if (paused || prefersReducedMotion || recipes.length <= 1) return;
    timerRef.current = setInterval(() => {
      beginTransition((indexRef.current + 1) % recipes.length, "next");
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(timerRef.current);
    // beginTransition is redefined each render but only reads from refs/props
    // that are already covered by these deps, so it's safe to omit.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused, prefersReducedMotion, recipes.length]);

  useLayoutEffect(() => {
    function measure() {
      const heights = measureRefs.current.map((el) => el?.offsetHeight ?? 0);
      setRowHeight(Math.max(0, ...heights));
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [recipes]);

  if (!recipes.length) return null;
  const recipe = recipes[index];

  return (
    <section
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Hidden clones of every featured recipe, used only to measure the tallest
          row so the visible section never resizes when the recipe switches.
          The wrapper is pinned to h-0 + overflow-hidden so its content — still
          `visibility:hidden` rather than `display:none`, since it needs real
          layout geometry to measure — can never inflate the page's scrollable
          height, no matter how tall the clones inside it are. */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-0 overflow-hidden">
        <div className="invisible">
          {recipes.map((r, i) => (
            <div key={r.id} ref={(el) => (measureRefs.current[i] = el)} className={ROW_CLASS}>
              <HeroContent recipe={r} />
            </div>
          ))}
        </div>
      </div>

      {/* While transitioning, the old and new recipe sit side by side in one
          double-wide track; the track slides by half its width so the old
          pane glides fully out of view as the new one glides fully in. */}
      <div className="slide-viewport" style={rowHeight ? { minHeight: rowHeight } : undefined}>
        {outgoing ? (
          <div className={`slide-track ${outgoing.direction === "next" ? "slide-track-next" : "slide-track-prev"}`}>
            {outgoing.direction === "next" ? (
              <>
                <div className={`slide-pane ${ROW_CLASS}`}>
                  <HeroContent recipe={outgoing.recipe} />
                </div>
                <div className={`slide-pane ${ROW_CLASS}`}>
                  <HeroContent recipe={recipe} />
                </div>
              </>
            ) : (
              <>
                <div className={`slide-pane ${ROW_CLASS}`}>
                  <HeroContent recipe={recipe} />
                </div>
                <div className={`slide-pane ${ROW_CLASS}`}>
                  <HeroContent recipe={outgoing.recipe} />
                </div>
              </>
            )}
          </div>
        ) : (
          <div className={ROW_CLASS}>
            <HeroContent recipe={recipe} />
          </div>
        )}
      </div>

      {recipes.length > 1 && (
        <div className="flex justify-center gap-2 pb-2" role="tablist" aria-label="Featured recipes">
          {recipes.map((r, i) => (
            <button
              key={r.id}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={t("heroDotLabel", r.title)}
              onClick={() => beginTransition(i, i > index ? "next" : "prev")}
              className={`h-2.5 w-2.5 rounded-full transition ${i === index ? "bg-accent" : "bg-line"}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
