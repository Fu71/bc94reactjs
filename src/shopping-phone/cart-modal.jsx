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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1A0F0A]/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl rounded-[6px] border border-[#CA8A04]/40 bg-[#2C1A10] quest-glow-lg p-6 lg:p-8 flex flex-col max-h-[90vh]">
        {/* Top 2px gold accent border */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#CA8A04]" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#5C3D2E]">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🎒</span>
            <div>
              <h3 className="font-cinzel text-xl font-bold text-[#F5E6D3] tracking-wide">
                Túi Đồ & Giỏ Hàng (Adventurer's Inventory)
              </h3>
              <p className="font-spectral text-xs text-[#BFA98A]">
                {cart.length === 0
                  ? "Túi đồ của bạn đang trống"
                  : `Đang có ${cart.reduce((acc, item) => acc + item.soLuong, 0)} vật phẩm đã chọn`}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-[4px] border border-[#5C3D2E] text-[#BFA98A] hover:text-[#CA8A04] hover:border-[#CA8A04] flex items-center justify-center transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Content / Items list */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3">
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-3 opacity-60">📜</div>
              <p className="font-cinzel text-[#CA8A04] text-base">
                Chưa có thiết bị nào trong túi đồ
              </p>
              <p className="font-spectral text-sm text-[#BFA98A] mt-1">
                Hãy dạo quanh cửa hàng và nhấn "Thêm Giỏ" để chọn vật phẩm.
              </p>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.maSP}
                className="flex items-center justify-between gap-4 p-3 rounded-[4px] border border-[#3D2517] bg-[#1A0F0A]/60 hover:bg-[#3D2517]/40 transition-colors"
              >
                <img
                  src={item.hinhAnh}
                  alt={item.tenSP}
                  className="w-14 h-14 object-contain bg-[#2C1A10] p-1 rounded-[2px] border border-[#5C3D2E]/50"
                />

                <div className="flex-1 min-w-0">
                  <h4 className="font-cinzel text-sm font-bold text-[#F5E6D3] truncate">
                    {item.tenSP}
                  </h4>
                  <p className="font-spectral text-xs text-[#CA8A04] mt-0.5">
                    {formatPrice(item.giaBan)} VNĐ
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onUpdateQuantity(item.maSP, -1)}
                    className="w-7 h-7 rounded-[2px] border border-[#CA8A04] text-[#CA8A04] hover:bg-[#CA8A04]/20 flex items-center justify-center font-bold text-sm cursor-pointer"
                  >
                    -
                  </button>
                  <span className="font-fira text-sm font-semibold w-6 text-center text-[#F5E6D3]">
                    {item.soLuong}
                  </span>
                  <button
                    onClick={() => onUpdateQuantity(item.maSP, 1)}
                    className="w-7 h-7 rounded-[2px] border border-[#CA8A04] text-[#CA8A04] hover:bg-[#CA8A04]/20 flex items-center justify-center font-bold text-sm cursor-pointer"
                  >
                    +
                  </button>
                </div>

                {/* Total per item */}
                <div className="w-24 text-right">
                  <span className="font-fira text-sm font-semibold text-[#CA8A04]">
                    {formatPrice(item.giaBan * item.soLuong)}
                  </span>
                </div>

                {/* Delete button */}
                <button
                  onClick={() => onRemoveItem(item.maSP)}
                  title="Remove from inventory"
                  className="p-1.5 rounded-[2px] text-[#991B1B] hover:text-[#EF4444] hover:bg-[#991B1B]/10 transition-colors cursor-pointer"
                >
                  🗑️
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="pt-4 border-t border-[#5C3D2E] space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-cinzel text-sm uppercase tracking-wider text-[#BFA98A]">
                Tổng Cống Nạp (Total Tribute):
              </span>
              <div>
                <span className="font-cinzel text-2xl font-bold text-[#CA8A04] quest-glow-sm">
                  {formatPrice(totalPrice)}
                </span>
                <span className="font-spectral text-sm text-[#BFA98A] ml-1">VNĐ</span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3">
              <button
                onClick={onClearCart}
                className="px-4 py-2 text-xs font-cinzel tracking-wider text-[#BFA98A] hover:text-[#991B1B] hover:border-[#991B1B] border border-transparent rounded-[4px] transition-colors cursor-pointer"
              >
                Xóa tất cả
              </button>
              <button
                onClick={() => {
                  alert(
                    "🎉 Chúc mừng bạn đã hoàn thành nhiệm vụ đặt hàng! Đơn hàng truyền tin ma thuật đã được ghi nhận thành công."
                  );
                  onClearCart();
                  onClose();
                }}
                className="flex-1 py-3 px-6 text-sm font-cinzel font-bold tracking-widest uppercase rounded-[4px] border border-[#DAA520] bg-[#CA8A04] text-[#1A0F0A] hover:bg-[#B8780A] hover:quest-glow-active transition-all cursor-pointer shadow-md"
              >
                ⚔️ Hoàn Tất Đơn Hàng (Scribe Order)
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
