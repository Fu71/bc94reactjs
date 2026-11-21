export default function Phone(props) {
  const { phone, onDetailPhone, onAddToCart, isSelected } = props;

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price);
  };

  return (
    <div
      className={`group relative flex flex-col justify-between rounded-2xl p-6 transition-all duration-300 ${
        isSelected
          ? "bg-[#241A14] border border-amber-500/40 shadow-xl shadow-amber-500/10 -translate-y-1"
          : "bg-[#18110D]/90 border border-white/5 hover:border-amber-500/20 hover:bg-[#201611] hover:shadow-2xl hover:shadow-amber-500/5 hover:-translate-y-1.5"
      }`}
    >
      {/* Brand & Badge Tag */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-amber-500/90 bg-amber-500/10 px-2.5 py-1 rounded-full">
          {phone.brand || "SmartPhone"}
        </span>
        <span className="text-xs text-slate-400">
          {phone.badge || "Chính Hãng"}
        </span>
      </div>

      {/* Spacious Product Image Display (No harsh boxes, large & clear) */}
      <div className="relative my-4 flex h-60 w-full items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-radial from-amber-500/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <img
          src={phone.hinhAnh}
          alt={phone.tenSP}
          className="max-h-56 w-auto object-contain transition-transform duration-500 ease-out group-hover:scale-105 drop-shadow-[0_15px_25px_rgba(0,0,0,0.6)]"
        />
      </div>

      {/* Product Information */}
      <div className="mt-2 flex-1">
        <h3 className="text-xl font-bold text-slate-100 transition-colors group-hover:text-amber-400">
          {phone.tenSP}
        </h3>
        <p className="mt-1 text-sm text-slate-400 line-clamp-1">
          {phone.manHinh}
        </p>

        {/* Clean Tech Specs */}
        <div className="mt-3 flex items-center gap-2 text-xs text-slate-300">
          <span className="bg-white/5 px-2.5 py-1 rounded-md border border-white/5">
            RAM {phone.ram}
          </span>
          <span className="bg-white/5 px-2.5 py-1 rounded-md border border-white/5">
            ROM {phone.rom}
          </span>
        </div>
      </div>

      {/* Price & Action CTA */}
      <div className="mt-6 pt-4 border-t border-white/5">
        <div className="flex items-baseline justify-between mb-4">
          <span className="text-xs font-medium text-slate-400">Giá bán chính hãng</span>
          <div className="text-right">
            <span className="text-2xl font-extrabold text-amber-400 tracking-tight">
              {formatPrice(phone.giaBan)}
            </span>
            <span className="text-xs font-medium text-slate-400 ml-1">₫</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => onDetailPhone(phone)}
            className="w-full py-2.5 px-3 text-xs font-semibold rounded-xl border border-white/10 bg-white/5 text-slate-200 hover:bg-white/10 hover:text-white transition-all cursor-pointer text-center"
          >
            Xem thông số
          </button>
          <button
            onClick={() => onAddToCart(phone)}
            className="w-full py-2.5 px-3 text-xs font-bold rounded-xl bg-amber-500 hover:bg-amber-400 text-black shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transition-all cursor-pointer text-center"
          >
            + Thêm giỏ
          </button>
        </div>
      </div>
    </div>
  );
}
