const STEPS = [
  { num: 1, label: "Address" },
  { num: 2, label: "Payment" },
  { num: 3, label: "Done" },
];

export default function CheckoutSteps({ current }: { current: number }) {
  return (
    <div className="flex items-center mb-12">
      {STEPS.map((step, i) => (
        <div key={step.num} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-display font-black text-sm transition-all
              ${
                current > step.num
                  ? "bg-ink border-ink text-bg"
                  : current === step.num
                    ? "bg-gold border-gold text-white"
                    : "bg-transparent border-border-2 text-ink-4"
              }`}
            >
              {current > step.num ? "✓" : step.num}
            </div>
            <span
              className={`text-[10px] mt-1.5 font-display font-bold tracking-wide transition-colors
              ${current >= step.num ? "text-ink" : "text-ink-4"}`}
            >
              {step.label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div
              className={`w-16 h-0.5 mx-2 mb-5 transition-all ${current > step.num ? "bg-ink" : "bg-border-2"}`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
