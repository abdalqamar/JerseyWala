import { Link } from "react-router-dom";
import OrderCard from "../components/OrderCard";
import { DEMO_ORDERS } from "../data/orders";

export default function Orders() {
  if (DEMO_ORDERS.length === 0)
    return (
      <div className="min-h-screen bg-bg flex flex-col items-center justify-center px-6 pt-20">
        <div className="text-6xl mb-5">📦</div>
        <h2 className="font-display font-black text-ink text-3xl mb-3">
          NO ORDERS YET
        </h2>
        <p className="text-ink-3 font-body mb-8">
          You haven't placed any orders.
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
      <div className="max-w-2xl mx-auto">
        <h1 className="font-display font-black text-ink text-4xl md:text-5xl mb-2">
          MY ORDERS
        </h1>
        <p className="text-ink-3 font-body mb-10">
          {DEMO_ORDERS.length} order{DEMO_ORDERS.length !== 1 ? "s" : ""} total
        </p>

        {DEMO_ORDERS.map((order, idx) => (
          <OrderCard key={order.id} order={order} index={idx} />
        ))}
      </div>
    </div>
  );
}
