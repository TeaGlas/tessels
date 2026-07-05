import { Link } from "react-router-dom";
import ImagePlaceholder from "./ImagePlaceholder.jsx";
import Chip from "./Chip.jsx";
import TimeChip from "./TimeChip.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";

export default function RecipeCard({ recipe, variant = "grid" }) {
  const { tCategory } = useLanguage();
  const href = `/recipes/${recipe.slug}`;
  const category = tCategory(recipe.category);

  if (variant === "onSage") {
    return (
      <Link
        to={href}
        className="group flex h-full flex-col gap-3 rounded-lg bg-sage-500 p-4 shadow-card transition hover:-translate-y-0.5"
      >
        <ImagePlaceholder src={recipe.image} alt={recipe.title} aspect="3:2" />
        <div>
          <h3 className="line-clamp-2 min-h-[3.5rem] font-display text-lg font-bold text-white">{recipe.title}</h3>
          <p className="mt-1 line-clamp-2 min-h-[2.625rem] text-[14px] text-white/80">{recipe.blurb}</p>
        </div>
        <div className="mt-auto flex flex-wrap gap-2">
          <Chip tone="onSage">{category}</Chip>
          <TimeChip tone="onSage" time={recipe.totalTime} />
        </div>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link
        to={href}
        className="group flex items-center gap-3 rounded-lg border border-line bg-white p-3 shadow-card transition hover:-translate-y-0.5"
      >
        <ImagePlaceholder src={recipe.image} alt={recipe.title} aspect="1:1" className="w-20 shrink-0" rounded="rounded-thumb" />
        <div className="min-w-0">
          <h3 className="truncate font-display text-base font-bold text-sage-900">{recipe.title}</h3>
          <div className="mt-1 flex flex-wrap gap-1.5">
            <Chip tone="mint">{category}</Chip>
            <TimeChip time={recipe.totalTime} />
          </div>
        </div>
      </Link>
    );
  }

  if (variant === "search") {
    return (
      <Link
        to={href}
        className="group flex gap-4 rounded-lg border border-line bg-white p-4 shadow-card transition hover:-translate-y-0.5"
      >
        <ImagePlaceholder src={recipe.image} alt={recipe.title} aspect="1:1" className="w-28 shrink-0" rounded="rounded-thumb" />
        <div className="min-w-0">
          <h3 className="font-display text-lg font-bold text-sage-900">{recipe.title}</h3>
          <p className="mt-1 line-clamp-2 text-[15px] text-muted">{recipe.blurb}</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            <Chip tone="mint">{category}</Chip>
            <TimeChip time={recipe.totalTime} />
          </div>
        </div>
      </Link>
    );
  }

  // "grid" (default)
  return (
    <Link
      to={href}
      className="group flex flex-col gap-3 rounded-lg border border-line bg-white p-4 shadow-card transition hover:-translate-y-0.5"
    >
      <ImagePlaceholder src={recipe.image} alt={recipe.title} aspect="3:2" />
      <div>
        <h3 className="font-display text-[22px] font-bold leading-tight text-sage-900">{recipe.title}</h3>
        <p className="mt-1 line-clamp-2 text-[15px] text-muted">{recipe.blurb}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        <Chip tone="mint">{category}</Chip>
        <TimeChip time={recipe.totalTime} />
      </div>
    </Link>
  );
}
