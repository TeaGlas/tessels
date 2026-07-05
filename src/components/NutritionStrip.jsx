export default function NutritionStrip({ items }) {
  if (!items?.length) return null;

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {items.map((item) => (
        <div key={item.label} className="rounded-lg border border-line bg-white px-4 py-3 text-center">
          <div className="font-display text-2xl font-bold text-sage-900">{item.value}</div>
          <div className="mt-0.5 text-[12px] font-bold uppercase tracking-wide text-muted">{item.label}</div>
        </div>
      ))}
    </div>
  );
}
