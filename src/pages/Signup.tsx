import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthCard from "../components/AuthCard";
import PasswordStrength from "../components/PasswordStrength";
import { signUp } from "../services/authService";

interface Form {
  name: string;
  email: string;
  password: string;
  confirm: string;
}

const inputCls =
  "w-full bg-bg border border-border rounded-xl px-4 py-3 text-ink font-body text-sm focus:border-gold focus:shadow-[0_0_0_3px_rgba(196,154,42,0.12)] transition-all";
const labelCls =
  "font-display font-bold text-[10px] text-ink-4 tracking-[1.5px] block mb-1.5";

export default function Signup() {
  const [form, setForm] = useState<Form>({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async () => {
    setError("");
    if (!form.name || !form.email || !form.password || !form.confirm) {
      setError("Please fill in all fields.");
      return;
    }
    if (!form.email.includes("@")) {
      setError("Enter a valid email address.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }
    try {
      setLoading(true);
      await signUp(form.email, form.password, form.name);
      navigate("/login");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong.");
      }
      setLoading(false);
    }
  };

  return (
    <AuthCard title="CREATE ACCOUNT" subtitle="Join the FootballMonk family">
      {/* Error */}
      {error && (
        <div className="bg-error-bg border border-[rgba(192,57,43,0.2)] rounded-xl px-4 py-3 mb-5">
          <p className="text-error font-body text-sm">⚠️ {error}</p>
        </div>
      )}

      {/* Full Name */}
      <div className="mb-4">
        <label className={labelCls}>FULL NAME</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Rahul Sharma"
          className={inputCls}
        />
      </div>

      {/* Email */}
      <div className="mb-4">
        <label className={labelCls}>EMAIL ADDRESS</label>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="you@example.com"
          className={inputCls}
        />
      </div>

      {/* Password */}
      <div className="mb-1">
        <label className={labelCls}>PASSWORD</label>
        <div className="relative">
          <input
            name="password"
            type={showPass ? "text" : "password"}
            value={form.password}
            onChange={handleChange}
            placeholder="Min. 6 characters"
            className={`${inputCls} pr-12`}
          />
          <button
            onClick={() => setShowPass((s) => !s)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-4 hover:text-ink-2 transition-colors text-base"
          >
            {showPass ? "🙈" : "👁️"}
          </button>
        </div>
      </div>

      {/* Password strength bar */}
      <PasswordStrength password={form.password} />

      {/* Confirm Password */}
      <div className="mb-7">
        <label className={labelCls}>CONFIRM PASSWORD</label>
        <input
          name="confirm"
          type="password"
          value={form.confirm}
          onChange={handleChange}
          placeholder="Re-enter password"
          className={`${inputCls} ${form.confirm && form.confirm !== form.password ? "border-error" : ""}`}
        />
        {form.confirm && form.confirm !== form.password && (
          <p className="text-error text-xs font-body mt-1">
            Passwords don't match
          </p>
        )}
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className={`w-full font-display font-black text-sm tracking-wider py-3.5 rounded-xl transition-all flex items-center justify-center gap-2
          ${loading ? "bg-bg-3 text-ink-4 cursor-not-allowed" : "bg-gold text-white hover:bg-gold-dark hover:shadow-lg"}`}
      >
        {loading ? (
          <>
            <span className="w-4 h-4 border-2 border-ink-4 border-t-transparent rounded-full animate-spin" />{" "}
            CREATING ACCOUNT...
          </>
        ) : (
          "CREATE ACCOUNT →"
        )}
      </button>

      {/* Divider */}
      <div className="flex items-center gap-3 my-6">
        <div className="flex-1 h-px bg-border" />
        <span className="text-ink-4 font-body text-xs">OR</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      {/* Google */}
      <button className="w-full border border-border text-ink-2 font-body text-sm py-3 rounded-xl flex items-center justify-center gap-2.5 hover:border-border-2 hover:bg-bg-2 transition-all">
        🌐 Continue with Google
      </button>

      <p className="text-center mt-7 text-ink-3 font-body text-sm">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-gold font-semibold hover:text-gold-dark transition-colors"
        >
          Login
        </Link>
      </p>
    </AuthCard>
  );
}
