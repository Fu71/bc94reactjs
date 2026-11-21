import { NavLink, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { totalCount } = useCart();

  const navLinkClass = ({ isActive }) =>
    `px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
      isActive
        ? "bg-amber-500 text-black shadow-sm shadow-amber-500/20"
        : "text-slate-300 hover:text-white hover:bg-white/5"
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-[#0F0A07]/90 backdrop-blur-xl">
      <div className="container mx-auto px-4 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-lg text-black font-extrabold shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
            ⚡
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-extrabold tracking-tight text-white font-brand">
                TECH<span className="text-amber-400">ZONE</span>
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Điện Thoại & Phụ Kiện Chính Hãng
            </p>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-2">
          <NavLink to="/" end className={navLinkClass}>
            📱 Cửa hàng
          </NavLink>
          <NavLink to="/glasses" className={navLinkClass}>
            👓 Thử kính online
          </NavLink>
          <NavLink to="/cart" className={navLinkClass}>
            🛒 Giỏ hàng
          </NavLink>
        </nav>

        {/* Right CTA: Cart Button */}
        <div className="flex items-center gap-3">
          <Link
            to="/cart"
            className="relative inline-flex items-center gap-2.5 px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 hover:text-white transition-all shadow-sm"
          >
            <span>🛒</span>
            <span className="hidden sm:inline">Giỏ hàng</span>
            {totalCount > 0 && (
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-amber-500 text-black text-[11px] font-extrabold shadow-md">
                {totalCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
