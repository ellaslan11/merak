export function OnboardingShell({
  children,
  step,
  totalSteps,
}: {
  children: React.ReactNode;
  step: number;
  totalSteps: number;
}) {
  const pct = (step / totalSteps) * 100;

  return (
    <div className="min-h-full flex flex-col">
      <header className="px-5 pt-2 pb-6">
        <span className="heading-serif text-[22px] text-espresso">Merak</span>
        <div className="mt-5 h-1 rounded-full bg-espresso/8 overflow-hidden">
          <div
            className="h-full bg-espresso rounded-full transition-all duration-500 ease-out"
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="text-[12px] text-warm-gray mt-2 font-medium">
          Step {step} of {totalSteps}
        </p>
      </header>
      <main className="flex-1 px-5 pb-8">{children}</main>
    </div>
  );
}
