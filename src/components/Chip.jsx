const TONE_CLASSES = {
  mint: "bg-mint text-sage-700",
  onSage: "bg-white/15 text-white",
};

export default function Chip({ children, icon, tone = "mint" }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-pill px-3 py-1 text-[13px] font-semibold ${TONE_CLASSES[tone]}`}
    >
      {icon}
      {children}
    </span>
  );
}
