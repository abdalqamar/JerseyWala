export type OrderStatus = "processing" | "shipped" | "delivered" | "cancelled";
export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  img: string;
}

export interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
}
