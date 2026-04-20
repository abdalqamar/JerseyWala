import { createContext, useContext, useState, type ReactNode } from "react";
import type { CartItem, Product, Size } from "../types/product";

interface CartContextType {
  cart: CartItem[];
  cartCount: number;
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  updateQty: (id: number, delta: number) => void;
  updateSize: (id: number, size: Size) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);

  const addToCart = (product: Product) =>
    setCart((prev) => {
      const exists = prev.find((i) => i.id === product.id);
      if (exists)
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      return [...prev, { ...product, quantity: 1, size: "M" }];
    });

  const removeFromCart = (id: number) =>
    setCart((prev) => prev.filter((i) => i.id !== id));

  const updateQty = (id: number, delta: number) =>
    setCart((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i,
      ),
    );

  const updateSize = (id: number, size: Size) =>
    setCart((prev) => prev.map((i) => (i.id === id ? { ...i, size } : i)));

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        addToCart,
        removeFromCart,
        updateQty,
        updateSize,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCartContext = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCartContext must be inside CartProvider");
  return ctx;
};
