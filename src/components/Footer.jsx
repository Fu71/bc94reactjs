import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-white/5 bg-[#0A0704] py-12">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <div className="text-lg font-bold text-white font-brand inline-block">
              TECH<span className="text-amber-400">ZONE</span>
            </div>
            <p className="text-xs text-slate-400 mt-1 max-w-sm">
              Ứng dụng E-Commerce xây dựng trên React 19, React Router v7, Formik & Yup Validation.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <Link to="/" className="hover:text-amber-400 transition-colors">
              Cửa hàng
            </Link>
            <Link to="/glasses" className="hover:text-amber-400 transition-colors">
              Thử kính online
            </Link>
            <Link to="/cart" className="hover:text-amber-400 transition-colors">
              Giỏ hàng
            </Link>
            <Link to="/checkout" className="hover:text-amber-400 transition-colors">
              Thanh toán
            </Link>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-600">
          <div>© 2026 TechZone Store • All rights reserved.</div>
          <div className="flex items-center gap-2 text-slate-500">
            <span className="px-2 py-0.5 rounded bg-white/5 border border-white/5">React Router v7</span>
            <span className="px-2 py-0.5 rounded bg-white/5 border border-white/5">Formik + Yup</span>
            <span className="px-2 py-0.5 rounded bg-white/5 border border-white/5">Custom Hooks</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
