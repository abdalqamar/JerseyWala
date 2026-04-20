import type { CartItem } from "../types/product";

interface Props {
  cart: CartItem[];
  shipping: number;
  total: number;
}

export default function OrderSummary({ cart, shipping, total }: Props) {
  return (
    <div className="bg-card border border-border rounded-2xl p-5 sticky top-20">
      <h3 className="font-display font-black text-ink text-base mb-4 tracking-wide">
        ORDER SUMMARY
      </h3>

      {/* Items */}
      <div className="space-y-3 mb-4">
        {cart.map((item) => (
          <div key={item.id} className="flex items-center gap-3">
            <img
              src={item.img}
              alt={item.name}
              className="w-12 h-12 rounded-lg object-cover bg-bg-2 shrink-0"
            />
            <div className="flex-1 min-w-0">
              <p className="font-display font-bold text-ink text-xs leading-tight truncate">
                {item.name}
              </p>
              <p className="font-body text-ink-4 text-[10px]">
                Size: {item.size} × {item.qty}
              </p>
            </div>
            <span className="font-display font-black text-gold text-sm shrink-0">
              ₹{item.price * item.qty}
            </span>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="border-t border-border pt-3 space-y-1.5">
        <div className="flex justify-between">
          <span className="text-ink-3 font-body text-xs">Shipping</span>
          <span
            className={`font-body text-xs font-semibold ${shipping === 0 ? "text-success" : "text-ink-2"}`}
          >
            {shipping === 0 ? "FREE" : `₹${shipping}`}
          </span>
        </div>
        <div className="flex justify-between pt-1">
          <span className="font-display font-black text-ink text-sm">
            TOTAL
          </span>
          <span className="font-display font-black text-gold text-lg">
            ₹{total}
          </span>
        </div>
      </div>
    </div>
  );
}
