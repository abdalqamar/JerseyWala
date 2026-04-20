import { supabase } from "../lib/supabaseClient";
import { useQuery } from "@tanstack/react-query";
import { PRODUCTS } from "../data/products";
import type { Product } from "../types/product";

interface Filters {
  search: string;
  category: string;
}

async function fetchProducts(filters: Filters): Promise<Product[]> {
  await new Promise((r) => setTimeout(r, 200));

  return PRODUCTS.filter((p) => {
    const matchCat = filters.category === "All" || p.club === filters.category;
    const q = filters.search.toLowerCase().trim();
    const matchQ =
      q === "" ||
      p.name.toLowerCase().includes(q) ||
      p.club.toLowerCase().includes(q) ||
      p.season.toLowerCase().includes(q) ||
      p.badge.toLowerCase().includes(q);
    return matchCat && matchQ;
  });
}

// async function fetchProducts(filters: Filters): Promise<Product[]> {
//   let query = supabase.from("products").select("*");

//   if (filters.category !== "All") {
//     query = query.eq("club", filters.category);
//   }

//   if (filters.search.trim()) {
//     query = query.or(
//       `name.ilike.%${filters.search}%,club.ilike.%${filters.search}%`,
//     );
//   }

//   const { data, error } = await query;
//   if (error) throw error;
//   return data ?? [];
// }

export function useProducts(filters: Filters) {
  return useQuery({
    queryKey: ["products", filters.search, filters.category],
    queryFn: () => fetchProducts(filters),
    staleTime: 1000 * 30,
    placeholderData: (prev) => prev,
  });
}
