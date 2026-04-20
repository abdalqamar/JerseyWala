import { supabase } from "../lib/supabaseClient";
import { useQuery } from "@tanstack/react-query";
import type { Product } from "../types/product";

interface Filters {
  search: string;
  category: string;
}

async function fetchProducts(filters: Filters): Promise<Product[]> {
  let query = supabase.from("products").select("*");

  if (filters.category !== "All") {
    query = query.eq("club", filters.category);
  }

  if (filters.search.trim()) {
    query = query.or(
      `name.ilike.%${filters.search}%,club.ilike.%${filters.search}%`,
    );
  }

  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}

export function useProducts(filters: Filters) {
  return useQuery({
    queryKey: ["products", filters.search, filters.category],
    queryFn: () => fetchProducts(filters),
    staleTime: 1000 * 30,
    placeholderData: (prev) => prev,
  });
}
