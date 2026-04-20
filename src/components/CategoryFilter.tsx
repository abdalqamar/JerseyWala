import { CATEGORIES } from "../data/products";

interface Props {
  active: string;
  onChange: (cat: string) => void;
}

export default function CategoryFilter({ active, onChange }: Props) {
  return (
    <div className="flex gap-2.5 flex-wrap">
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`font-display font-bold text-sm tracking-wide px-5 py-2 rounded-full border transition-all
            ${
              active === cat
                ? "bg-ink border-ink text-bg"
                : "bg-transparent border-border-2 text-ink-3 hover:border-ink hover:text-ink"
            }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
