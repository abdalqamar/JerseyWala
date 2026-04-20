type Method = "razorpay" | "cod";

interface Option {
  id: Method;
  label: string;
  sub: string;
  icon: string;
}

const OPTIONS: Option[] = [
  {
    id: "razorpay",
    label: "Razorpay",
    sub: "UPI, Cards, NetBanking, Wallets",
    icon: "💳",
  },
  {
    id: "cod",
    label: "Cash on Delivery",
    sub: "Pay when your order arrives",
    icon: "💵",
  },
];

interface Props {
  selected: Method;
  onChange: (m: Method) => void;
}

export default function PaymentMethod({ selected, onChange }: Props) {
  return (
    <div>
      <h3 className="font-display font-black text-ink text-xl mb-6">
        PAYMENT METHOD
      </h3>
      {OPTIONS.map((opt) => (
        <div
          key={opt.id}
          onClick={() => onChange(opt.id)}
          className={`flex items-center gap-4 p-4 rounded-xl border-[1.5px] mb-3 cursor-pointer transition-all
            ${
              selected === opt.id
                ? "border-gold bg-gold-bg"
                : "border-border hover:border-border-2"
            }`}
        >
          <span className="text-2xl">{opt.icon}</span>
          <div className="flex-1">
            <p className="font-display font-black text-ink text-sm">
              {opt.label}
            </p>
            <p className="font-body text-ink-4 text-xs">{opt.sub}</p>
          </div>
          <div
            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all
            ${selected === opt.id ? "border-gold bg-gold" : "border-border-2"}`}
          >
            {selected === opt.id && (
              <div className="w-2 h-2 rounded-full bg-white" />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
