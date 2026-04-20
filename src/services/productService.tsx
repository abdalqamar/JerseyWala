import { supabase } from "../lib/supabaseClient";

export const getProducts = async () => {
  const { data, error } = await supabase.from("products").select("*");

  if (error) throw new Error(error.message);

  return data;
};
