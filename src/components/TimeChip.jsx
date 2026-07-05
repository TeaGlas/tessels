import Chip from "./Chip.jsx";

function ClockIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path d="M12 7v5l3.5 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function TimeChip({ time, tone = "mint" }) {
  return (
    <Chip icon={<ClockIcon />} tone={tone}>
      {time}
    </Chip>
  );
}
