import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-nav border-t border-[rgba(196,154,42,0.15)] py-10 px-6">
      <div className="max-w-6xl mx-auto flex justify-between items-center flex-wrap gap-5">
        <Link to="/" className="flex items-center">
          <img src="/logo-dark.svg" alt="JerseyWala" className="h-8 w-auto" />
        </Link>
        <p className="text-gold-dark font-body text-xs">
          © 2026 JerseyWala. All rights reserved.
        </p>
        <div className="flex gap-6">
          {["Terms", "Contact", "Track Order"].map((item) => (
            <span
              key={item}
              className="text-gold-dark font-body text-xs cursor-pointer hover:text-gold transition-colors"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
