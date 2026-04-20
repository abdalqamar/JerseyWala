import type { CartItem as CartItemType, Size } from "../types/product";
import { useCart } from "../hooks/useCart";

const SIZES: Size[] = ["S", "M", "L", "XL", "XXL"];

interface Props {
  item: CartItemType;
  index: number;
}

export default function CartItem({ item, index }: Props) {
  const { removeFromCart, updateQty, updateSize } = useCart();

  return (
    <div
      className="slide-right bg-card border border-border rounded-2xl p-4 flex gap-4"
      style={{ animationDelay: `${index * 0.06}s` }}
    >
      {/* Image */}
      <img
        src={item.image}
        alt={item.name}
        className="w-24 h-24 object-cover rounded-xl bg-bg-2 shrink-0"
      />

      {/* Details */}
      <div className="flex-1 min-w-0">
        {/* Top row */}
        <div className="flex justify-between items-start mb-1">
          <div>
            <p className="font-display font-black text-ink text-base leading-tight">
              {item.name}
            </p>
            <p className="font-body text-ink-4 text-xs mt-0.5">{item.season}</p>
          </div>
          <button
            onClick={() => removeFromCart(item.id)}
            className="text-ink-4 hover:text-error text-xl leading-none transition-colors ml-2 shrink-0"
            aria-label="Remove item"
          >
            ×
          </button>
        </div>

        {/* Size + Qty + Price */}
        <div className="flex items-center gap-4 mt-3 flex-wrap">
          {/* Size */}
          <div className="flex gap-1.5 overflow-x-auto">
            {SIZES.map((s) => (
              <button
                key={s}
                onClick={() => updateSize(item.id, s)}
                className={`shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-lg border font-display font-bold text-[9px] sm:text-[11px] transition-all
        ${
          item.size === s
            ? "bg-ink border-ink text-bg"
            : "bg-transparent border-border-2 text-ink-3 hover:border-ink hover:text-ink"
        }`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Qty */}
          <div className="flex items-center border border-border-2 rounded-lg overflow-hidden">
            <button
              onClick={() => updateQty(item.id, -1)}
              className="w-8 h-8 bg-bg-2 text-ink font-bold text-base hover:bg-bg-3 transition-colors"
            >
              −
            </button>
            <span className="w-9 text-center font-display font-black text-ink text-sm">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQty(item.id, 1)}
              className="w-8 h-8 bg-bg-2 text-ink font-bold text-base hover:bg-bg-3 transition-colors"
            >
              +
            </button>
          </div>

          {/* Price */}
          <span className="text-gold font-display font-black text-lg ml-auto">
            ₹{item.price * item.quantity}
          </span>
        </div>
      </div>
    </div>
  );
}
