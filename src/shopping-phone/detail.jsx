export default function Detail(props) {
  const { selectedPhone, onAddToCart } = props;

  if (!selectedPhone) {
    return (
      <div className="mt-12 rounded-2xl border border-white/5 bg-[#18110D] p-8 text-center">
        <p className="text-slate-300 font-medium text-base">
          Chọn một chiếc điện thoại trong danh sách trên để xem thông số kỹ thuật chi tiết
        </p>
      </div>
    );
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price);
  };

  const specRows = [
    { label: "Màn hình", value: selectedPhone.manHinh, icon: "📱" },
    { label: "Hệ điều hành", value: selectedPhone.heDieuHanh, icon: "⚙️" },
    { label: "Camera trước", value: selectedPhone.cameraTruoc, icon: "🤳" },
    { label: "Camera sau", value: selectedPhone.cameraSau, icon: "📸" },
    { label: "Dung lượng RAM", value: selectedPhone.ram, icon: "⚡" },
    { label: "Bộ nhớ trong (ROM)", value: selectedPhone.rom, icon: "💾" },
  ];

  return (
    <section className="mt-16 rounded-3xl border border-white/10 bg-[#140E0A]/95 p-6 lg:p-10 shadow-2xl backdrop-blur-xl">
      {/* Header section with high visual clarity */}
      <div className="border-b border-white/10 pb-6 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-400 bg-amber-500/10 rounded-full border border-amber-500/20">
              {selectedPhone.brand || "SmartPhone"} • {selectedPhone.badge || "Chính Hãng"}
            </span>
            <span className="text-xs text-slate-500">
              Mã SP: SP-{selectedPhone.maSP.toString().padStart(3, "0")}
            </span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold text-slate-100 mt-2 tracking-tight">
            Thông số kỹ thuật: <span className="text-amber-400">{selectedPhone.tenSP}</span>
          </h2>
          <p className="text-slate-400 text-sm mt-1 max-w-2xl leading-relaxed">
            {selectedPhone.moTaNgan || selectedPhone.manHinh}
          </p>
        </div>

        <div className="text-left md:text-right">
          <span className="text-xs font-medium text-slate-400 block mb-1">
            Giá niêm yết
          </span>
          <div className="flex items-baseline md:justify-end gap-1">
            <span className="text-3xl font-extrabold text-amber-400 tracking-tight">
              {formatPrice(selectedPhone.giaBan)}
            </span>
            <span className="text-sm font-semibold text-slate-400">₫</span>
          </div>
        </div>
      </div>

      {/* Grid: Left Product View, Right Spec Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Image display & CTA */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="relative w-full rounded-2xl bg-[#1C140F] border border-white/5 p-8 flex items-center justify-center min-h-[340px] shadow-inner group">
            <div className="absolute inset-0 bg-radial from-amber-500/10 via-transparent to-transparent rounded-2xl pointer-events-none" />
            <img
              src={selectedPhone.hinhAnh}
              alt={selectedPhone.tenSP}
              className="max-h-72 w-auto object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.7)] transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          <button
            onClick={() => onAddToCart && onAddToCart(selectedPhone)}
            className="mt-6 w-full py-3.5 px-6 text-sm font-bold tracking-wide rounded-xl bg-amber-500 hover:bg-amber-400 text-black shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>🛒</span>
            <span>Thêm vào giỏ hàng ngay</span>
          </button>
        </div>

        {/* Right Column: Clean Spec Table */}
        <div className="lg:col-span-7">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#19110C]">
            <table className="w-full text-left text-sm">
              <tbody>
                {specRows.map((row, index) => (
                  <tr
                    key={index}
                    className={`border-b border-white/5 transition-colors hover:bg-white/[0.02] ${
                      index % 2 === 0 ? "bg-[#1E1510]" : "bg-[#19110C]"
                    }`}
                  >
                    <th className="py-4 px-5 font-medium text-slate-400 w-2/5 flex items-center gap-2.5">
                      <span className="text-base">{row.icon}</span>
                      <span>{row.label}</span>
                    </th>
                    <td className="py-4 px-5 text-slate-200 font-semibold">
                      {row.value || "Đang cập nhật"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Service Guarantees (Clean, modern perks) */}
          <div className="mt-6 grid grid-cols-3 gap-3 text-center">
            <div className="p-4 rounded-xl border border-white/5 bg-[#1B130E] hover:border-amber-500/20 transition-all">
              <div className="text-xl mb-1">🛡️</div>
              <div className="text-xs font-semibold text-slate-200">Bảo hành 12 tháng</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Chính hãng tại trung tâm</div>
            </div>
            <div className="p-4 rounded-xl border border-white/5 bg-[#1B130E] hover:border-amber-500/20 transition-all">
              <div className="text-xl mb-1">⚡</div>
              <div className="text-xs font-semibold text-slate-200">Giao nhanh 2 giờ</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Miễn phí toàn quốc</div>
            </div>
            <div className="p-4 rounded-xl border border-white/5 bg-[#1B130E] hover:border-amber-500/20 transition-all">
              <div className="text-xl mb-1">🔄</div>
              <div className="text-xs font-semibold text-slate-200">Lỗi 1 đổi 1</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Trong 30 ngày đầu</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
