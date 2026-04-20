import { useCart } from "../hooks/useCart";
import { PRODUCTS } from "../data/products";

interface Props {
  onShopNow: () => void;
  onViewSale: () => void;
}

export default function HeroSection({ onShopNow, onViewSale }: Props) {
  const { addToCart } = useCart();

  return (
    <section className="bg-bg-2 border-b border-border pt-16 pb-16 px-6 overflow-hidden relative">
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#1a1205 1px,transparent 1px),linear-gradient(90deg,#1a1205 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="max-w-6xl mx-auto  relative">
        <div className="flex items-center gap-16 flex-wrap">
          {/* Left */}
          <div className="flex-1 min-w-70 fade-up">
            <div className="inline-flex items-center gap-2 bg-gold text-white text-[10px] font-display font-black tracking-[2px] px-4 py-1.5 rounded mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-white inline-block" />
              WORLD CUP 2026 KITS AVAILABLE
            </div>

            <h1 className="font-display font-black leading-[0.92] tracking-tight mb-6 text-[clamp(52px,8vw,88px)]">
              <span className="text-ink block">PLAY</span>
              <span className="text-gold block">LIKE</span>
              <span className="text-ink block">YOUR</span>
              <span
                className="block"
                style={{
                  WebkitTextStroke: "2px #c49a2a",
                  color: "transparent",
                }}
              >
                HERO
              </span>
            </h1>

            <p className="text-ink-3 font-body text-base max-w-sm leading-relaxed mb-8">
              India's finest football jerseys. Premium quality from ₹599. Free
              shipping on all prepaid orders.
            </p>

            <div className="flex gap-3 flex-wrap">
              <button
                onClick={onShopNow}
                className="bg-ink text-bg font-display font-black text-sm tracking-wider px-8 py-3.5 rounded-xl hover:bg-ink-2 hover:shadow-lg transition-all"
              >
                SHOP NOW →
              </button>
              <button
                onClick={onViewSale}
                className="bg-transparent text-ink border-[1.5px] border-border-2 font-display font-black text-sm tracking-wider px-8 py-3.5 rounded-xl hover:border-gold hover:text-gold-dark transition-all"
              >
                VIEW SALE
              </button>
            </div>

            <div className="flex gap-10 mt-12">
              {[
                ["10K+", "Happy Fans"],
                ["500+", "Jerseys"],
                ["₹599", "Starting From"],
              ].map(([num, label]) => (
                <div key={label}>
                  <p className="text-gold font-display font-black text-2xl">
                    {num}
                  </p>
                  <p className="text-ink-4 font-body text-xs mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Featured card */}
          <div className="flex-1 min-w-60 max-w-90 hidden md:flex justify-center fade-up">
            <div className="w-full bg-card border border-border rounded-2xl overflow-hidden shadow-lg">
              <div className="overflow-hidden">
                <img
                  src={PRODUCTS[2].img}
                  alt={PRODUCTS[2].name}
                  className="w-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4 flex justify-between items-center">
                <div>
                  <p className="font-display font-black text-ink text-base">
                    Argentina Messi Kit
                  </p>
                  <p className="text-gold font-display font-black text-xl">
                    ₹1,199
                  </p>
                </div>
                <button
                  onClick={() => addToCart(PRODUCTS[2])}
                  className="bg-gold text-white font-display font-black text-xs tracking-wide px-4 py-2 rounded-lg hover:bg-gold-dark transition-all"
                >
                  ADD +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
