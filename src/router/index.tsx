import { createBrowserRouter, Outlet, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../hooks/useAuth";

const Home = lazy(() => import("../pages/Home"));
const Cart = lazy(() => import("../pages/Cart"));
const Checkout = lazy(() => import("../pages/Checkout"));
const Orders = lazy(() => import("../pages/Orders"));
const Login = lazy(() => import("../pages/Login"));
const Signup = lazy(() => import("../pages/Signup"));
const NotFound = lazy(() => import("../pages/NotFound"));

function PageLoader() {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

// Navbar + Footer wala layout
function RootLayout() {
  return (
    <div className="bg-bg text-ink min-h-screen">
      <Navbar />
      <main style={{ paddingTop: "64px" }}>
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

// Login / Signup — koi Navbar Footer nahi
function AuthLayout() {
  return (
    <div className="bg-bg text-ink min-h-screen">
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
    </div>
  );
}

// Checkout — Navbar hai, Footer nahi
function CheckoutLayout() {
  return (
    <div className="bg-bg text-ink min-h-screen">
      <Navbar />
      <main style={{ paddingTop: "64px" }}>
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
}

// Login required pages
function ProtectedRoute() {
  const { user } = useAuth();
  return user ? <Outlet /> : <Navigate to="/login" replace />;
}

export const router = createBrowserRouter([
  // Public pages — Navbar + Footer
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/cart", element: <Cart /> },
      { path: "/orders", element: <Orders /> },
    ],
  },

  // Checkout — login required, Navbar only
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <CheckoutLayout />,
        children: [{ path: "/checkout", element: <Checkout /> }],
      },
    ],
  },

  // Auth pages — no Navbar no Footer
  {
    element: <AuthLayout />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
    ],
  },

  // 404
  { path: "*", element: <NotFound /> },
]);
