import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useCart } from "../hooks/useCart";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const { user, notifs, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const unread = notifs.filter((n) => !n.read).length;
  const isDark = scrolled || menuOpen;

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setNotifOpen(false);
    setUserMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { to: "/", label: "HOME" },
    { to: "/orders", label: "MY ORDERS" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 px-6 h-16 flex items-center justify-between transition-all duration-300
        ${
          scrolled || menuOpen
            ? "bg-nav border-b border-[rgba(196,154,42,0.15)] backdrop-blur-md"
            : "bg-bg-2 border-b border-border"
        }`}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center shrink-0">
          <img
            src={isDark ? "/logo-dark.svg" : "/logo-light.svg"}
            alt="JerseyWala"
            className="h-9 w-auto"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="font-display font-bold text-sm tracking-wider transition-all pb-0.5 border-b-2"
              style={{
                color:
                  location.pathname === to
                    ? "#c49a2a"
                    : isDark
                      ? "rgba(250,248,244,0.7)"
                      : "#7a6e5e",
                borderColor:
                  location.pathname === to ? "#c49a2a" : "transparent",
              }}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Right icons */}
        <div className="flex items-center gap-3">
          {/* Notification Bell */}
          <div
            className="relative cursor-pointer"
            onClick={() => {
              setNotifOpen((o) => !o);
              setUserMenuOpen(false);
            }}
          >
            <span className="text-lg">🔔</span>
            {unread > 0 && (
              <span className="absolute -top-1 -right-1 bg-gold text-white w-4 h-4 rounded-full text-[9px] font-black flex items-center justify-center">
                {unread}
              </span>
            )}
            {notifOpen && (
              <div className="slide-in absolute top-9 right-0 bg-card border border-border rounded-2xl w-72 p-3 shadow-xl z-50">
                <p className="font-display font-bold text-[10px] text-ink-4 tracking-[2px] mb-2.5">
                  NOTIFICATIONS
                </p>
                {notifs.length === 0 && (
                  <p className="text-ink-4 font-body text-sm py-2">
                    No notifications yet
                  </p>
                )}
                {notifs.map((n, i) => (
                  <div key={i} className="bg-bg-2 rounded-xl p-2.5 mb-2">
                    <p className="font-body text-sm" style={{ color: n.color }}>
                      {n.msg}
                    </p>
                    <p className="font-body text-[11px] text-ink-4 mt-0.5">
                      {n.time}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* User / Auth */}
          {user ? (
            <div className="relative">
              <div
                onClick={() => {
                  setUserMenuOpen((o) => !o);
                  setNotifOpen(false);
                }}
                className="flex items-center gap-2 cursor-pointer rounded-full py-1 pl-1.5 pr-3 transition-all"
                style={{
                  background: isDark
                    ? "rgba(255,255,255,0.1)"
                    : "rgba(26,18,5,0.06)",
                  border: isDark
                    ? "1px solid rgba(255,255,255,0.2)"
                    : "1px solid #e8e2d8",
                }}
              >
                <div className="w-7 h-7 rounded-full bg-gold flex items-center justify-center text-sm font-black text-white">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span
                  className="font-display font-bold text-sm max-w-20 truncate hidden md:block"
                  style={{ color: isDark ? "#faf8f4" : "#1a1205" }}
                >
                  {user.name.split(" ")[0]}
                </span>
              </div>
              {userMenuOpen && (
                <div className="slide-in absolute top-11 right-0 bg-card border border-border rounded-2xl w-44 p-2 shadow-xl z-50">
                  <button
                    onClick={() => navigate("/orders")}
                    className="w-full text-left px-3 py-2.5 rounded-xl font-body text-sm text-ink-2 hover:bg-bg-2 transition-colors"
                  >
                    📦 My Orders
                  </button>
                  <div className="border-t border-border my-1" />
                  <button
                    onClick={() => {
                      logout();
                      navigate("/");
                    }}
                    className="w-full text-left px-3 py-2.5 rounded-xl font-body text-sm hover:bg-bg-2 transition-colors"
                    style={{ color: "#c0392b" }}
                  >
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="hidden md:block font-display font-bold text-sm tracking-wide px-4 py-1.5 rounded-lg transition-all hover:border-gold hover:text-gold"
              style={{
                border: isDark
                  ? "1px solid rgba(255,255,255,0.3)"
                  : "1px solid #d9d0c0",
                color: isDark ? "rgba(250,248,244,0.7)" : "#7a6e5e",
              }}
            >
              LOGIN
            </Link>
          )}

          {/* Cart */}
          <Link
            to="/cart"
            className="bg-gold text-white font-display font-black text-sm px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 hover:bg-gold-dark transition-all pulse"
          >
            🛒 <span>{cartCount}</span>
          </Link>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="md:hidden flex flex-col gap-1.5 p-1.5"
            aria-label="Toggle menu"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="block w-5 h-0.5 rounded-full transition-all duration-300"
                style={{
                  background: menuOpen
                    ? "#c49a2a"
                    : isDark
                      ? "#faf8f4"
                      : "#1a1205",
                  transform: menuOpen
                    ? i === 0
                      ? "rotate(45deg) translate(5px, 5px)"
                      : i === 2
                        ? "rotate(-45deg) translate(4px, -4px)"
                        : "none"
                    : "none",
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div
          className="slide-down fixed top-16 left-0 right-0 z-40 px-6 py-5 md:hidden"
          style={{
            background: "#1a1205",
            borderBottom: "1px solid rgba(196,154,42,0.15)",
          }}
        >
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="flex items-center justify-between py-4 font-display font-black text-lg tracking-wide"
              style={{
                borderBottom: "1px solid rgba(255,255,255,0.1)",
                color:
                  location.pathname === to
                    ? "#c49a2a"
                    : "rgba(250,248,244,0.8)",
              }}
            >
              {label}
              {location.pathname === to && (
                <span style={{ color: "#c49a2a", fontSize: "10px" }}>●</span>
              )}
            </Link>
          ))}
          {user ? (
            <>
              <div
                className="py-4 flex items-center gap-3"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}
              >
                <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center font-black text-white">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p
                    className="font-display font-black text-base"
                    style={{ color: "#faf8f4" }}
                  >
                    {user.name}
                  </p>
                  <p
                    className="font-body text-xs"
                    style={{ color: "rgba(250,248,244,0.5)" }}
                  >
                    {user.email}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className="mt-4 font-display font-black text-lg tracking-wide"
                style={{ color: "#c0392b" }}
              >
                🚪 LOGOUT
              </button>
            </>
          ) : (
            <div className="flex gap-3 pt-5">
              <Link
                to="/login"
                className="flex-1 bg-gold text-white font-display font-black text-sm tracking-wide py-3 rounded-xl text-center"
              >
                LOGIN
              </Link>
              <Link
                to="/signup"
                className="flex-1 font-display font-black text-sm tracking-wide py-3 rounded-xl text-center"
                style={{
                  border: "1px solid rgba(255,255,255,0.3)",
                  color: "#faf8f4",
                }}
              >
                SIGN UP
              </Link>
            </div>
          )}
        </div>
      )}
    </>
  );
}
