import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import CheckoutSteps from "../components/CheckoutSteps";
import PaymentMethod from "../components/PaymentMethod";
import OrderSummary from "../components/OrderSummary";
import { useCart } from "../hooks/useCart";
import { useAuth } from "../hooks/useAuth";
import { formatPrice } from "../utils/formatPrice";
import toast from "react-hot-toast";
import { useState } from "react";
import { FIELDS } from "../constants";
import { AlertCircle, CheckCircle } from "lucide-react";

type Method = "razorpay" | "cod";

type Form = {
  name: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
  state: string;
};

const inputBase =
  "w-full bg-bg border rounded-xl px-4 py-3 text-ink font-body text-sm transition-all focus:outline-none";

export default function Checkout() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [payMethod, setPayMethod] = useState<Method>("razorpay");
  const [placing, setPlacing] = useState(false);
  const [orderId, setOrderId] = useState("");

  const { cart, clearCart } = useCart();
  const { addNotif } = useAuth();
  const navigate = useNavigate();

  const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const shipping = subtotal >= 999 ? 0 : 99;
  const total = subtotal + shipping;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Form>({ mode: "onTouched" });

  // Pincode auto-fill
  const handlePincodeChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const val = e.target.value;
    setValue("pincode", val, { shouldValidate: true });

    if (val.length === 6) {
      try {
        const res = await fetch(`https://api.postalpincode.in/pincode/${val}`);
        const data = await res.json();
        if (data[0].Status === "Success") {
          const post = data[0].PostOffice[0];
          setValue("city", post.District, { shouldValidate: true });
          setValue("state", post.State, { shouldValidate: true });
        } else {
          toast.error("Invalid pincode.");
        }
      } catch {
        toast.error("Could not fetch pincode data.");
      }
    }
  };

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

  const validationRules: Record<string, object> = {
    name: { required: "Full name is required" },
    phone: {
      required: "Phone number is required",
      pattern: {
        value: /^[6-9]\d{9}$/,
        message: "Enter a valid 10-digit Indian mobile number",
      },
    },
    address: { required: "Address is required" },
    city: { required: "City is required" },
    pincode: {
      required: "Pincode is required",
      pattern: {
        value: /^\d{6}$/,
        message: "Enter a valid 6-digit pincode",
      },
    },
    state: { required: "State is required" },
  };

  /*  Success Screen  */
  if (step === 3)
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center px-6 pt-16">
        <div className="fade-up text-center max-w-md">
          {/* Icon */}
          <div className="w-20 h-20 rounded-full bg-success-bg border-2 border-success flex items-center justify-center mx-auto mb-6 shadow-md">
            <CheckCircle size={36} className="text-success" />
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

          {/* Buttons */}
          <div className="flex gap-3 justify-center flex-wrap">
            <button
              onClick={() => navigate("/orders")}
              className="bg-gold text-white font-display font-black text-sm tracking-wider px-7 py-3.5 rounded-xl hover:bg-gold-dark hover:shadow-lg transition-all"
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
          <div className="flex-2 min-w-0 w-full">
            {/*  Step 1 */}
            {step === 1 && (
              <form
                onSubmit={handleSubmit(() => setStep(2))}
                className="fade-up bg-card border border-border rounded-2xl p-7"
              >
                <h3 className="font-display font-black text-ink text-xl mb-6">
                  DELIVERY ADDRESS
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {FIELDS.map((field) => {
                    const hasError = !!errors[field.name as keyof Form];
                    const isPincode = field.name === "pincode";

                    return (
                      <div key={field.name} className={field.col}>
                        {/* Label */}
                        <label className="font-display font-bold text-[10px] text-ink-4 tracking-[1.5px] block mb-1.5">
                          {field.label}
                          <span className="text-error ml-0.5">*</span>
                        </label>

                        {/* Input */}
                        {isPincode ? (
                          <input
                            {...register("pincode", validationRules.pincode)}
                            onChange={handlePincodeChange}
                            placeholder={field.placeholder}
                            maxLength={6}
                            className={`${inputBase} ${
                              hasError
                                ? "border-error focus:border-error focus:shadow-[0_0_0_3px_rgba(192,57,43,0.1)]"
                                : "border-border focus:border-gold focus:shadow-[0_0_0_3px_rgba(196,154,42,0.12)]"
                            }`}
                          />
                        ) : (
                          <input
                            {...register(
                              field.name as keyof Form,
                              validationRules[field.name],
                            )}
                            placeholder={field.placeholder}
                            className={`${inputBase} ${
                              hasError
                                ? "border-error focus:border-error focus:shadow-[0_0_0_3px_rgba(192,57,43,0.1)]"
                                : "border-border focus:border-gold focus:shadow-[0_0_0_3px_rgba(196,154,42,0.12)]"
                            }`}
                          />
                        )}

                        {/* Error message */}
                        {hasError && (
                          <p className="mt-1.5 text-error font-body text-[11px] flex items-center gap-1">
                            <AlertCircle size={12} />
                            {errors[field.name as keyof Form]?.message}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>

                <button
                  type="submit"
                  className="mt-7 bg-ink text-bg font-display font-black text-sm tracking-wider px-8 py-3.5 rounded-xl hover:bg-gold hover:shadow-lg transition-all"
                >
                  CONTINUE TO PAYMENT →
                </button>
              </form>
            )}

            {/*  Step 2  Payment  */}
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
                    className={`flex-1 font-display font-black text-sm tracking-wider py-3 rounded-xl transition-all flex items-center justify-center gap-2 ${
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
                      `PAY ${formatPrice(total)} →`
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
