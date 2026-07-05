export default function Instructions({ sections }) {
  let stepNumber = 0;

  return (
    <div className="flex flex-col gap-8">
      {sections.map((section) => (
        <div key={section.group}>
          <h2 className="font-display text-[22px] font-bold text-sage-900">{section.group}</h2>
          <ol className="mt-4 flex flex-col gap-5">
            {section.steps.map((step) => {
              stepNumber += 1;
              return (
                <li key={stepNumber} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-mint font-display text-[15px] font-bold text-sage-700">
                    {stepNumber}
                  </span>
                  <p className="pt-0.5 text-[17px] leading-relaxed text-ink">{step}</p>
                </li>
              );
            })}
          </ol>
        </div>
      ))}
    </div>
  );
}
