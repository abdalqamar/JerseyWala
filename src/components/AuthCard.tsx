import type { ReactNode } from "react";
import { Link } from "react-router-dom";

interface Props {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export default function AuthCard({ title, subtitle, children }: Props) {
  return (
    <div className="min-h-screen bg-bg-2 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md bg-card border border-border rounded-3xl p-9 shadow-xl fade-up">
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center mb-8">
          <img src="/logo-light.svg" alt="JerseyWala" className="h-10 w-auto" />
        </Link>

        <h1 className="font-display font-black text-ink text-3xl text-center mb-1.5">
          {title}
        </h1>
        <p className="text-ink-3 font-body text-sm text-center mb-8">
          {subtitle}
        </p>

        {children}
      </div>
    </div>
  );
}
