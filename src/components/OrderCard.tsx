import { useState } from "react";
import type { Order, OrderStatus } from "../types/order";

const statusStyle: Record<
  OrderStatus,
  { label: string; cls: string; icon: string }
> = {
  processing: {
    label: "Processing",
    cls: "bg-warning-bg text-warning",
    icon: "⏳",
  },
  shipped: { label: "Shipped", cls: "bg-[#dbeafe] text-[#1a5276]", icon: "🚚" },
  delivered: {
    label: "Delivered",
    cls: "bg-success-bg text-success",
    icon: "✅",
  },
  failed: { label: "Failed", cls: "bg-error-bg text-error", icon: "❌" },
};

const TIMELINE = ["Ordered", "Processing", "Shipped", "Delivered"];
const statusRank: Record<OrderStatus, number> = {
  processing: 1,
  shipped: 2,
  delivered: 3,
  failed: 0,
};

export default function OrderCard({
  order,
  index,
}: {
  order: Order;
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const s = statusStyle[order.status];

  return (
    <div
      className="slide-right bg-card border border-border rounded-2xl overflow-hidden mb-4"
      style={{ animationDelay: `${index * 0.07}s` }}
    >
      {/* Header */}
      <div
        onClick={() => setExpanded((e) => !e)}
        className="flex items-center gap-4 px-5 py-4 cursor-pointer hover:bg-bg transition-colors flex-wrap"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1 flex-wrap">
            <span className="font-display font-black text-ink text-base">
              #{order.id}
            </span>
            <span
              className={`${s.cls} text-[11px] font-display font-black px-3 py-0.5 rounded-full tracking-wide`}
            >
              {s.icon} {s.label.toUpperCase()}
            </span>
          </div>
          <p className="text-ink-4 font-body text-xs">
            {order.date} · {order.items.length} item
            {order.items.length !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="text-right shrink-0">
          <p className="font-display font-black text-gold text-xl">
            ₹{order.total}
          </p>
          <p className="text-ink-4 text-[11px] font-body">
            {expanded ? "▲ hide" : "▼ details"}
          </p>
        </div>
      </div>

      {/* Expanded */}
      {expanded && (
        <div className="border-t border-border px-5 py-4 fade-up">
          {/* Items */}
          {order.items.map((item, i) => (
            <div key={i} className="flex items-center gap-4 mb-4">
              <img
                src={item.img}
                alt={item.name}
                className="w-14 h-14 rounded-xl object-cover bg-bg-2 shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="font-display font-black text-ink text-sm">
                  {item.name}
                </p>
                <p className="text-ink-4 font-body text-xs">
                  Qty: {item.quantity}
                </p>
              </div>
              <span className="font-display font-black text-gold text-sm shrink-0">
                ₹{item.price * item.quantity}
              </span>
            </div>
          ))}

          {/* Timeline */}
          <div className="border-t border-border pt-4 mt-1">
            <p className="font-display font-bold text-[10px] text-ink-4 tracking-[2px] mb-3">
              ORDER TIMELINE
            </p>
            <div className="flex items-center">
              {TIMELINE.map((step, i) => {
                const done = i <= statusRank[order.status];
                return (
                  <div key={step} className="flex items-center">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-[10px] font-black transition-all
                        ${done ? "bg-ink border-ink text-bg" : "bg-transparent border-border-2 text-ink-4"}`}
                      >
                        {done ? "✓" : i + 1}
                      </div>
                      <span
                        className={`text-[9px] mt-1 font-display font-bold text-center max-w-11
                        ${done ? "text-ink" : "text-ink-4"}`}
                      >
                        {step}
                      </span>
                    </div>
                    {i < TIMELINE.length - 1 && (
                      <div
                        className={`w-9 h-0.5 mx-1.5 mb-4 transition-all
                        ${done && i + 1 <= statusRank[order.status] ? "bg-ink" : "bg-border-2"}`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
