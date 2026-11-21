import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export default function CartPage() {
  useDocumentTitle("Giỏ Hàng Của Bạn");
  const { cart, updateQuantity, removeFromCart, clearCart, totalPrice, totalCount } =
    useCart();

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price);
  };

  return (
    <div className="container mx-auto px-4 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Giỏ Hàng
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            {cart.length === 0
              ? "Giỏ hàng hiện đang trống"
              : `Bạn đang có ${totalCount} sản phẩm trong giỏ hàng`}
          </p>
        </div>
        {cart.length > 0 && (
          <button
            onClick={clearCart}
            className="text-xs text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
          >
            Xóa tất cả
          </button>
        )}
      </div>

      {cart.length === 0 ? (
        <div className="rounded-3xl border border-white/5 bg-[#140E0A] p-16 text-center max-w-xl mx-auto my-12 shadow-2xl">
          <div className="text-6xl mb-4 opacity-50">🛍️</div>
          <h2 className="text-2xl font-bold text-white">Chưa có sản phẩm nào</h2>
          <p className="text-sm text-slate-400 mt-2 mb-8">
            Hãy khám phá các mẫu điện thoại mới nhất và thêm vào giỏ hàng nhé!
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm shadow-lg shadow-amber-500/20 transition-all"
          >
            <span>📱</span>
            <span>Khám phá sản phẩm ngay</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Cart Items List */}
          <div className="lg:col-span-8 space-y-4">
            {cart.map((item) => (
              <div
                key={item.maSP}
                className="flex flex-col sm:flex-row items-center justify-between gap-5 p-5 rounded-2xl bg-[#160E0A] border border-white/5 hover:border-white/10 transition-all shadow-md"
              >
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <img
                    src={item.hinhAnh}
                    alt={item.tenSP}
                    className="w-20 h-20 object-contain p-2 rounded-xl bg-black/40 border border-white/5"
                  />
                  <div>
                    <Link
                      to={`/product/${item.maSP}`}
                      className="text-base font-bold text-white hover:text-amber-400 transition-colors"
                    >
                      {item.tenSP}
                    </Link>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Đơn giá: {formatPrice(item.giaBan)} ₫
                    </p>
                    <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full inline-block mt-2">
                      Chính hãng • Bảo hành 12T
                    </span>
                  </div>
                </div>

                {/* Quantity Controls & Subtotal */}
                <div className="flex items-center justify-between w-full sm:w-auto gap-6 pt-3 sm:pt-0 border-t sm:border-t-0 border-white/5">
                  <div className="flex items-center gap-2 bg-[#0F0A07] px-2.5 py-1.5 rounded-xl border border-white/10">
                    <button
                      onClick={() => updateQuantity(item.maSP, -1)}
                      className="w-7 h-7 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 flex items-center justify-center font-bold text-xs transition-colors cursor-pointer"
                    >
                      -
                    </button>
                    <span className="text-xs font-bold w-6 text-center text-white">
                      {item.soLuong}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.maSP, 1)}
                      className="w-7 h-7 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 flex items-center justify-center font-bold text-xs transition-colors cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  <div className="text-right min-w-[110px]">
                    <span className="text-base font-extrabold text-amber-400">
                      {formatPrice(item.giaBan * item.soLuong)} ₫
                    </span>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.maSP)}
                    className="p-2 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer"
                    title="Xóa sản phẩm"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}

            <div className="pt-4 flex justify-between items-center">
              <Link
                to="/"
                className="text-xs font-semibold text-slate-400 hover:text-amber-400 transition-colors inline-flex items-center gap-1.5"
              >
                <span>←</span>
                <span>Tiếp tục chọn thêm sản phẩm</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Order Summary Card */}
          <div className="lg:col-span-4">
            <div className="rounded-3xl border border-white/10 bg-[#160E0A] p-6 lg:p-7 shadow-2xl space-y-5 sticky top-28">
              <h3 className="text-lg font-bold text-white pb-3 border-b border-white/10">
                Tóm tắt đơn hàng
              </h3>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-slate-400">
                  <span>Tạm tính ({totalCount} sản phẩm):</span>
                  <span className="text-white font-semibold">{formatPrice(totalPrice)} ₫</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Phí vận chuyển:</span>
                  <span className="text-emerald-400 font-semibold">Miễn phí</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Bảo hiểm vận chuyển:</span>
                  <span className="text-emerald-400 font-semibold">Miễn phí</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-between items-baseline">
                <span className="text-base font-bold text-white">Tổng cộng:</span>
                <div className="text-right">
                  <span className="text-2xl font-extrabold text-amber-400 tracking-tight">
                    {formatPrice(totalPrice)}
                  </span>
                  <span className="text-xs font-semibold text-slate-400 ml-1">₫</span>
                </div>
              </div>

              <Link
                to="/checkout"
                className="w-full py-3.5 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm shadow-lg shadow-amber-500/25 transition-all text-center block"
              >
                Tiến hành đặt hàng →
              </Link>

              <div className="text-center text-[11px] text-slate-500">
                🔒 Thông tin thanh toán được bảo mật 100%
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
