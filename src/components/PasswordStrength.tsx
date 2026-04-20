interface Strength {
  score: number;
  label: string;
  barCls: string;
  textCls: string;
}

function getStrength(p: string): Strength {
  if (!p) return { score: 0, label: "", barCls: "", textCls: "" };
  let score = 0;
  if (p.length >= 8) score++;
  if (/[A-Z]/.test(p)) score++;
  if (/[0-9]/.test(p)) score++;
  if (/[^A-Za-z0-9]/.test(p)) score++;
  const map: Strength[] = [
    { score: 0, label: "", barCls: "bg-bg-3", textCls: "" },
    { score: 1, label: "Weak", barCls: "bg-error", textCls: "text-error" },
    { score: 2, label: "Fair", barCls: "bg-warning", textCls: "text-warning" },
    { score: 3, label: "Good", barCls: "bg-gold", textCls: "text-gold" },
    {
      score: 4,
      label: "Strong",
      barCls: "bg-success",
      textCls: "text-success",
    },
  ];
  return map[score];
}

export default function PasswordStrength({ password }: { password: string }) {
  if (!password) return null;
  const strength = getStrength(password);

  return (
    <div className="mt-2 mb-4">
      <div className="flex gap-1 mb-1">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`flex-1 h-1 rounded-full transition-all duration-300
              ${i <= strength.score ? strength.barCls : "bg-bg-3"}`}
          />
        ))}
      </div>
      {strength.label && (
        <p className={`text-[11px] font-body ${strength.textCls}`}>
          Password strength:{" "}
          <span className="font-semibold">{strength.label}</span>
        </p>
      )}
    </div>
  );
}
