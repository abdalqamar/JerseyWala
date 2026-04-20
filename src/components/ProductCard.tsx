import { useState } from "react";
import type { Product } from "../types/product";
import { useCart } from "../hooks/useCart";

const badgeClass: Record<string, string> = {
  NEW: "bg-ink text-bg",
  HOT: "bg-gold text-white",
  SALE: "bg-error text-white",
  WC: "bg-gold-dark text-bg",
};

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div className="group bg-card border border-border rounded-2xl overflow-hidden hover:-translate-y-1.5 hover:shadow-lg transition-all duration-300">
      {/* Image */}
      <div className="relative bg-bg-2 overflow-hidden">
        <img
          src={product.image}
          loading="lazy"
          alt={product.name}
          className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-400"
        />
        <span
          className={`absolute top-2.5 left-2.5 ${badgeClass[product.badge]} text-[10px] font-black tracking-wider font-display px-2 py-0.5 rounded`}
        >
          {product.badge}
        </span>
      </div>
      {/* Info */}
      <div className="p-3.5">
        <p className="text-ink-4 text-[10px] tracking-widest mb-1 font-body uppercase">
          {product.season}
        </p>
        <p className="text-ink font-display font-black text-base leading-tight mb-3">
          {product.name}
        </p>
        <p className="text-ink-4 text-[10px] tracking-widest mb-1 font-body uppercase">
          {product?.description}
        </p>
        <div className="flex justify-between items-center">
          <div>
            <span className="text-gold text-lg font-display font-black">
              ₹{product.price}
            </span>
            <span className="text-ink-4 text-xs line-through ml-1.5 font-body">
              ₹{product.original_price}
            </span>
          </div>
          <button
            onClick={handleAdd}
            className={`${added ? "bg-ink-2" : "bg-gold hover:bg-gold-dark"} text-white font-display font-black text-[11px] tracking-wide px-3.5 py-1.5 rounded-lg transition-all duration-200`}
          >
            {added ? "✓ ADDED" : "ADD +"}
          </button>
        </div>
      </div>
    </div>
  );
}
