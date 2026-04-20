import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import OrderSummary from "../components/OrderSummary";
import { useCart } from "../hooks/useCart";

export default function Cart() {
  const { cart, clearCart } = useCart();

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal >= 999 ? 0 : 99;
  const total = subtotal + shipping;

  if (cart.length === 0)
    return (
      <div className="min-h-screen bg-bg flex flex-col items-center justify-center px-6 pt-20">
        <div className="text-7xl mb-5">🛒</div>
        <h2 className="font-display font-black text-ink text-3xl mb-3">
          YOUR CART IS EMPTY
        </h2>
        <p className="text-ink-3 font-body mb-8">
          Add some jerseys to get started!
        </p>
        <Link
          to="/"
          className="bg-gold text-white font-display font-black text-sm tracking-wider px-8 py-3.5 rounded-xl hover:bg-gold-dark transition-all"
        >
          SHOP NOW →
        </Link>
      </div>
    );

  return (
    <div className="min-h-screen bg-bg pt-10 pb-16 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <h1 className="font-display font-black text-ink text-4xl md:text-5xl mb-2">
          YOUR CART
        </h1>
        <p className="text-ink-3 font-body mb-10">
          {cart.length} item{cart.length !== 1 ? "s" : ""} in your cart
        </p>

        <div className="flex gap-7 flex-wrap lg:flex-nowrap">
          {/* Cart Items */}
          <div className="flex-2 min-w-0 w-full">
            {cart.map((item, idx) => (
              <div key={item.id} className="mb-4">
                <CartItem item={item} index={idx} />
              </div>
            ))}
            <button
              onClick={clearCart}
              className="text-ink-4 font-body text-sm hover:text-error transition-colors mt-1"
            >
              🗑 Clear cart
            </button>
          </div>

          {/* Summary */}
          <div className="w-full lg:w-72 shrink-0">
            <OrderSummary cart={cart} shipping={shipping} total={total} />
            <Link
              to="/checkout"
              className="block w-full bg-gold text-white font-display font-black text-sm tracking-wider text-center py-3.5 rounded-xl hover:bg-gold-dark transition-all mt-4"
            >
              PROCEED TO CHECKOUT →
            </Link>
            <Link
              to="/"
              className="block w-full text-center text-ink-3 font-body text-sm mt-3 hover:text-ink transition-colors"
            >
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
