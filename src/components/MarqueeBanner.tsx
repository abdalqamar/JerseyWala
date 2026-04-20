import { MARQUEE_ITEMS } from "../data/products";

export default function MarqueeBanner() {
  return (
    <div className="bg-ink py-2.5 overflow-hidden">
      <div className="marquee-inner flex gap-12 w-max">
        {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
          <span
            key={i}
            className="text-gold font-display font-black text-[11px] tracking-[3px] whitespace-nowrap"
          >
            {item}
            <span className="text-bg opacity-30 ml-3">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
