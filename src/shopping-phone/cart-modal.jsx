export default function CartModal(props) {
  const { isOpen, onClose, cart, onUpdateQuantity, onRemoveItem, onClearCart } = props;

  if (!isOpen) return null;

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price);
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.giaBan * item.soLuong,
    0
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl rounded-3xl border border-white/10 bg-[#160F0B] p-6 lg:p-8 shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-lg">
              🛒
            </div>
            <div>
              <h3 className="text-xl font-bold text-white tracking-tight">
                Giỏ hàng của bạn
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {cart.length === 0
                  ? "Chưa có sản phẩm nào được chọn"
                  : `Đang có ${cart.reduce((acc, item) => acc + item.soLuong, 0)} sản phẩm`}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 flex items-center justify-center transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Product items list */}
        <div className="flex-1 overflow-y-auto py-5 space-y-3">
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-5xl mb-3 opacity-40">🛍️</div>
              <p className="text-base font-semibold text-slate-200">
                Giỏ hàng của bạn đang trống
              </p>
              <p className="text-sm text-slate-400 mt-1">
                Hãy dạo quanh cửa hàng và chọn cho mình mẫu điện thoại ưng ý!
              </p>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.maSP}
                className="flex items-center justify-between gap-4 p-4 rounded-2xl border border-white/5 bg-[#1F1611]/80 hover:bg-[#251B15] transition-colors"
              >
                <img
                  src={item.hinhAnh}
                  alt={item.tenSP}
                  className="w-16 h-16 object-contain p-1.5 rounded-xl bg-black/30 border border-white/5"
                />

                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-white truncate">
                    {item.tenSP}
                  </h4>
                  <p className="text-xs font-semibold text-amber-400 mt-0.5">
                    {formatPrice(item.giaBan)} ₫
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2 bg-black/40 px-2 py-1 rounded-xl border border-white/5">
                  <button
                    onClick={() => onUpdateQuantity(item.maSP, -1)}
                    className="w-6 h-6 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 flex items-center justify-center font-bold text-xs transition-colors cursor-pointer"
                  >
                    -
                  </button>
                  <span className="text-xs font-semibold w-6 text-center text-white">
                    {item.soLuong}
                  </span>
                  <button
                    onClick={() => onUpdateQuantity(item.maSP, 1)}
                    className="w-6 h-6 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 flex items-center justify-center font-bold text-xs transition-colors cursor-pointer"
                  >
                    +
                  </button>
                </div>

                {/* Subtotal */}
                <div className="w-24 text-right">
                  <span className="text-sm font-bold text-amber-400">
                    {formatPrice(item.giaBan * item.soLuong)} ₫
                  </span>
                </div>

                {/* Delete button */}
                <button
                  onClick={() => onRemoveItem(item.maSP)}
                  title="Xóa sản phẩm"
                  className="p-2 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                >
                  🗑️
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="pt-5 border-t border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-400">
                Tổng thanh toán:
              </span>
              <div className="text-right">
                <span className="text-2xl font-extrabold text-amber-400">
                  {formatPrice(totalPrice)}
                </span>
                <span className="text-xs font-semibold text-slate-400 ml-1">₫</span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3">
              <button
                onClick={onClearCart}
                className="px-4 py-3 text-xs font-semibold text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-colors cursor-pointer"
              >
                Xóa giỏ hàng
              </button>
              <button
                onClick={() => {
                  alert("🎉 Đặt hàng thành công! Đơn hàng của bạn đang được xử lý.");
                  onClearCart();
                  onClose();
                }}
                className="flex-1 py-3.5 px-6 text-sm font-bold tracking-wide rounded-xl bg-amber-500 hover:bg-amber-400 text-black shadow-lg shadow-amber-500/25 transition-all cursor-pointer text-center"
              >
                Tiến hành thanh toán
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
