export default function IngredientItem({ text, checked, onToggle }) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={onToggle}
      className={`flex w-full items-center gap-3 rounded-checkbox px-2 py-2 text-left text-[15px] transition ${
        checked ? "text-white/50 line-through" : "text-white"
      }`}
    >
      <span
        aria-hidden="true"
        className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-checkbox border transition ${
          checked ? "border-white bg-white text-sage-700" : "border-white/50 bg-transparent"
        }`}
      >
        {checked && (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <path d="M5 13l4 4 10-10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      {text}
    </button>
  );
}
