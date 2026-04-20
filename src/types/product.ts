export type Badge = "NEW" | "HOT" | "SALE" | "WC";
export type Size = "S" | "M" | "L" | "XL" | "XXL";

export interface Product {
  id: number;
  name: string;
  description: string;
  season: string;
  price: number;
  original_price: number;
  badge: Badge;
  club: string;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
  size: Size;
}
