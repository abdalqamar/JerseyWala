export type Badge = "NEW" | "HOT" | "SALE" | "WC";
export type Size = "S" | "M" | "L" | "XL" | "XXL";

export interface Product {
  id: number;
  name: string;
  season: string;
  price: number;
  original: number;
  badge: Badge;
  club: string;
  img: string;
}

export interface CartItem extends Product {
  qty: number;
  size: Size;
}
