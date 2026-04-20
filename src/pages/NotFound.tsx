import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg flex flex-col items-center justify-center px-6">
      <div className="text-8xl mb-6">⚽</div>
      <h1 className="font-display font-black text-ink text-7xl mb-3">404</h1>
      <p className="text-ink-3 font-body text-lg mb-10">
        Page not found, bhai!
      </p>
      <Link
        to="/"
        className="bg-gold text-white font-display font-black text-sm tracking-wider px-10 py-4 rounded-2xl hover:bg-gold-dark transition-all hover:shadow-lg"
      >
        GO HOME →
      </Link>
    </div>
  );
}
