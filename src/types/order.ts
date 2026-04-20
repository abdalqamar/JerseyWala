export type OrderStatus =
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "failed";

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  image: string;
}

export interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
}
