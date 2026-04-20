import type { Order } from "../types/order";

export const DEMO_ORDERS: Order[] = [
  {
    id: "FM1019",
    date: "12 Apr 2026",
    items: [
      {
        name: "Barcelona Home Kit",
        quantity: 1,
        price: 999,
        img: "https://footballmonk.in/wp-content/uploads/2025/09/FC-Barcelona-Home-Pedri-2025-26-Jersey-1.jpg",
      },
    ],
    total: 999,
    status: "delivered",
  },
  {
    id: "FM1021",
    date: "14 Apr 2026",
    items: [
      {
        name: "Argentina WC Kit",
        quantity: 2,
        price: 1199,
        img: "https://footballmonk.in/wp-content/uploads/2025/11/Argentina-World-Cup-Messi-Home-Kit-2026-1.jpg",
      },
    ],
    total: 2398,
    status: "shipped",
  },
  {
    id: "FM1023",
    date: "16 Apr 2026",
    items: [
      {
        name: "PSG Jordan Edition",
        quantity: 1,
        price: 799,
        img: "https://footballmonk.in/wp-content/uploads/2025/10/PSG-Jordan-Edition-Jersey-2024-25-1.jpg",
      },
      {
        name: "Germany WC Kit",
        quantity: 1,
        price: 1099,
        img: "https://footballmonk.in/wp-content/uploads/2025/11/Germany-World-Cup-Home-Kit-2026-1.jpg",
      },
    ],
    total: 1898,
    status: "processing",
  },
];
