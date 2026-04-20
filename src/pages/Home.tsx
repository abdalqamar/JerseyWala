import { useState } from "react";
import HeroSection from "../components/HeroSection";
import MarqueeBanner from "../components/MarqueeBanner";
import CategoryFilter from "../components/CategoryFilter";
import ProductCard from "../components/ProductCard";
import { PRODUCTS } from "../data/products";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);

  const clearSearch = () => setSearchQuery("");

  const filtered = PRODUCTS.filter((p) => {
    const matchCat = activeCategory === "All" || p.club === activeCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchSearch =
      q === "" ||
      p.name.toLowerCase().includes(q) ||
      p.club.toLowerCase().includes(q) ||
      p.season.toLowerCase().includes(q) ||
      p.badge.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  return (
    <div className="bg-bg min-h-screen">
      {/* ── Hero ── */}
      <HeroSection
        onShopNow={() =>
          document
            .getElementById("products")
            ?.scrollIntoView({ behavior: "smooth" })
        }
        onViewSale={() => {
          setActiveCategory("All");
          setSearchQuery("SALE");
        }}
      />

      {/* ── Marquee ── */}
      <MarqueeBanner />

      {/* ── Products Section ── */}
      <section id="products" className="max-w-6xl mx-auto px-6 py-16">
        {/* Section header */}
        <div className="flex justify-between items-end mb-6 flex-wrap gap-3">
          <div>
            <p className="text-gold font-display font-black text-[11px] tracking-[3px] mb-1.5">
              BROWSE BY CLUB
            </p>
            <h2 className="text-ink font-display font-black text-[clamp(26px,4vw,40px)]">
              YOUR FAVOURITE CLUBS
            </h2>
          </div>
          <p className="text-ink-4 font-body text-sm">
            {filtered.length} jersey{filtered.length !== 1 ? "s" : ""} found
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-5 max-w-md">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-4 text-sm pointer-events-none">
            🔍
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            placeholder="Search jerseys, clubs, players..."
            className={`w-full bg-card border rounded-xl py-3 pl-10 pr-10 text-ink font-body text-sm transition-all
              ${
                searchFocused || searchQuery
                  ? "border-gold shadow-[0_0_0_3px_rgba(196,154,42,0.12)]"
                  : "border-border hover:border-border-2"
              }`}
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-bg-3 text-ink-3 w-5 h-5 rounded-full text-sm flex items-center justify-center hover:bg-border-2 transition-colors"
            >
              ×
            </button>
          )}
        </div>

        {/* Search result info */}
        {searchQuery.trim() && (
          <div className="flex items-center gap-2.5 mb-4">
            <span className="text-ink-3 font-body text-sm">
              {filtered.length > 0 ? (
                <>
                  <span className="text-gold font-black">
                    {filtered.length}
                  </span>{" "}
                  result{filtered.length !== 1 ? "s" : ""} for "
                  <span className="text-ink-2">{searchQuery}</span>"
                </>
              ) : (
                <>
                  No results for "
                  <span className="text-ink-2">{searchQuery}</span>"
                </>
              )}
            </span>
            <button
              onClick={clearSearch}
              className="border border-border-2 text-ink-3 text-[11px] font-display font-bold px-2.5 py-0.5 rounded-full hover:border-gold hover:text-gold-dark transition-all"
            >
              CLEAR
            </button>
          </div>
        )}

        {/* Category Filter */}
        <div className="mb-10">
          <CategoryFilter
            active={activeCategory}
            onChange={setActiveCategory}
          />
        </div>

        {/* Product Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-5">🔍</div>
            <h3 className="text-ink font-display font-black text-2xl mb-2">
              NO JERSEYS FOUND
            </h3>
            <p className="text-ink-3 font-body text-sm mb-6">
              Try a different search or clear the filter
            </p>
            <button
              onClick={clearSearch}
              className="bg-gold text-white font-display font-black text-sm tracking-wide px-6 py-3 rounded-xl hover:bg-gold-dark transition-all"
            >
              CLEAR SEARCH
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
