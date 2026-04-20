import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import PaymentMethod from "../components/PaymentMethod";
import OrderSummary from "../components/OrderSummary";
import { useCart } from "../hooks/useCart";
import { useAuth } from "../hooks/useAuth";

interface Form {
  name: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
  state: string;
}

type Method = "razorpay" | "cod";

const inputCls =
  "w-full bg-bg border border-border rounded-xl px-4 py-3 text-ink font-body text-sm focus:border-gold focus:shadow-[0_0_0_3px_rgba(196,154,42,0.12)] transition-all";
const labelCls =
  "font-display font-bold text-[10px] text-ink-4 tracking-[1.5px] block mb-1.5";

const FIELDS = [
  {
    name: "name",
    label: "FULL NAME",
    placeholder: "Rahul Sharma",
    col: "sm:col-span-2",
  },
  {
    name: "phone",
    label: "PHONE NUMBER",
    placeholder: "+91 98765 43210",
    col: "sm:col-span-2",
  },
  {
    name: "address",
    label: "ADDRESS",
    placeholder: "House no., Street, Area",
    col: "sm:col-span-2",
  },
  { name: "city", label: "CITY", placeholder: "Mumbai", col: "" },
  { name: "pincode", label: "PINCODE", placeholder: "400001", col: "" },
  {
    name: "state",
    label: "STATE",
    placeholder: "Maharashtra",
    col: "sm:col-span-2",
  },
] as const;

export default function Checkout() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [form, setForm] = useState<Form>({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    state: "",
  });
  const [payMethod, setPayMethod] = useState<Method>("razorpay");
  const [placing, setPlacing] = useState(false);
  const [orderId, setOrderId] = useState("");

  const { cart, clearCart } = useCart();
  const { addNotif } = useAuth();
  const navigate = useNavigate();

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal >= 999 ? 0 : 99;
  const total = subtotal + shipping;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handlePlaceOrder = () => {
    setPlacing(true);
    setTimeout(() => {
      const id = "FM" + Math.floor(1000 + Math.random() * 9000);
      setOrderId(id);
      addNotif({
        msg: `✅ Order ${id} placed successfully!`,
        time: "Just now",
        color: "#c49a2a",
      });
      clearCart();
      setPlacing(false);
      setStep(3);
    }, 2000);
  };

  /* Success screen */
  if (step === 3)
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center px-6 pt-16">
        <div className="fade-up text-center max-w-md">
          <div className="w-20 h-20 rounded-full bg-success-bg border-2 border-success flex items-center justify-center text-4xl mx-auto mb-6">
            ✅
          </div>
          <h1 className="font-display font-black text-ink text-5xl mb-2">
            ORDER PLACED!
          </h1>
          <p className="text-gold font-display font-black text-2xl mb-4">
            #{orderId}
          </p>
          <p className="text-ink-3 font-body text-sm leading-relaxed mb-8">
            Your jersey is on its way! Track your order anytime from My Orders.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <button
              onClick={() => navigate("/orders")}
              className="bg-gold text-white font-display font-black text-sm tracking-wider px-7 py-3.5 rounded-xl hover:bg-gold-dark transition-all"
            >
              VIEW MY ORDERS
            </button>
            <button
              onClick={() => navigate("/")}
              className="border border-border-2 text-ink-2 font-display font-bold text-sm tracking-wide px-7 py-3.5 rounded-xl hover:border-gold hover:text-gold-dark transition-all"
            >
              CONTINUE SHOPPING
            </button>
          </div>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-bg pt-10 pb-16 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-display font-black text-ink text-4xl md:text-5xl mb-10">
          CHECKOUT
        </h1>

        <CheckoutSteps current={step} />

        <div className="flex gap-7 flex-wrap lg:flex-nowrap">
          {/* Form area */}
          <div className="flex-2 min-w-0 w-full">
            {/* Step 1 — Address */}
            {step === 1 && (
              <div className="fade-up bg-card border border-border rounded-2xl p-7">
                <h3 className="font-display font-black text-ink text-xl mb-6">
                  DELIVERY ADDRESS
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {FIELDS.map((field) => (
                    <div key={field.name} className={field.col}>
                      <label className={labelCls}>{field.label}</label>
                      <input
                        name={field.name}
                        value={form[field.name]}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        className={inputCls}
                      />
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setStep(2)}
                  className="mt-7 bg-ink text-bg font-display font-black text-sm tracking-wider px-8 py-3.5 rounded-xl hover:bg-ink-2 hover:shadow-lg transition-all"
                >
                  CONTINUE TO PAYMENT →
                </button>
              </div>
            )}

            {/* Step 2 — Payment */}
            {step === 2 && (
              <div className="fade-up bg-card border border-border rounded-2xl p-7">
                <PaymentMethod selected={payMethod} onChange={setPayMethod} />
                <div className="flex gap-3 mt-7">
                  <button
                    onClick={() => setStep(1)}
                    className="border border-border-2 text-ink-2 font-display font-bold text-sm tracking-wide px-6 py-3 rounded-xl hover:border-gold hover:text-gold-dark transition-all"
                  >
                    ← BACK
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    disabled={placing}
                    className={`flex-1 font-display font-black text-sm tracking-wider py-3 rounded-xl transition-all flex items-center justify-center gap-2
                      ${
                        placing
                          ? "bg-bg-3 text-ink-4 cursor-not-allowed"
                          : "bg-gold text-white hover:bg-gold-dark hover:shadow-lg"
                      }`}
                  >
                    {placing ? (
                      <>
                        <span className="w-4 h-4 border-2 border-ink-4 border-t-transparent rounded-full animate-spin" />
                        PLACING ORDER...
                      </>
                    ) : (
                      `PAY ₹${total} →`
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary sidebar */}
          <div className="w-full lg:w-64 shrink-0">
            <OrderSummary cart={cart} shipping={shipping} total={total} />
          </div>
        </div>
      </div>
    </div>
  );
}
