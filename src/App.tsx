import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { router } from "./router";

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </AuthProvider>
  );
}

// export default function App() {
//   return (
//     <div className="p-10 max-w-md mx-auto bg-card border border-border rounded-2xl">
//       <p className="text-gold font-display font-black text-2xl">TEST</p>
//       <p className="text-ink-3 font-body text-sm mt-2">
//         Agar yeh dikh raha hai to Tailwind kaam kar raha hai
//       </p>
//     </div>
//   );
// }
