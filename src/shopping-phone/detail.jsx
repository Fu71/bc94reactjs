export default function Detail(props) {
  const { selectedPhone, onAddToCart } = props;

  if (!selectedPhone) {
    return (
      <div className="mt-12 rounded-[4px] border border-[#5C3D2E] bg-[#2C1A10] p-8 text-center quest-glow-sm">
        <p className="font-cinzel text-[#CA8A04] text-lg">
          Select an artifact above to examine its ancient specifications
        </p>
        <p className="font-spectral text-sm text-[#BFA98A] mt-1">
          (Chọn một chiếc điện thoại trong danh sách để xem thông số kỹ thuật chi tiết)
        </p>
      </div>
    );
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price);
  };

  const specRows = [
    { label: "Màn Hình (Display Crystal)", value: selectedPhone.manHinh, icon: "💎" },
    { label: "Hệ Điều Hành (Enchantment OS)", value: selectedPhone.heDieuHanh, icon: "⚙️" },
    { label: "Camera Trước (Front Scrying Lens)", value: selectedPhone.cameraTruoc, icon: "👁️" },
    { label: "Camera Sau (Rear Arcane Sensor)", value: selectedPhone.cameraSau, icon: "🔮" },
    { label: "Bộ Nhớ RAM (Arcane Mana)", value: selectedPhone.ram, icon: "⚡" },
    { label: "Dung Lượng ROM (Citadel Vault)", value: selectedPhone.rom, icon: "📦" },
  ];

  return (
    <section className="mt-16 rounded-[4px] border border-[#5C3D2E] bg-[#2C1A10] p-6 lg:p-8 quest-glow-md relative overflow-hidden">
      {/* 2px gold accent top border */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#CA8A04]" />

      {/* Header section */}
      <div className="border-b border-[#5C3D2E]/70 pb-4 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-0.5 text-[11px] font-cinzel uppercase tracking-[1px] rounded-[2px] bg-[#CA8A04]/20 text-[#FACC15] border border-[#CA8A04]/40">
              ✦ {selectedPhone.rarity || "AUTHENTIC RELIC"}
            </span>
            <span className="text-xs font-fira text-[#BFA98A]">
              ID: RELIC-{selectedPhone.maSP.toString().padStart(4, "0")}
            </span>
          </div>
          <h2 className="font-cinzel text-2xl lg:text-3xl font-bold text-[#F5E6D3] mt-2 tracking-wide">
            {selectedPhone.tenSP}
          </h2>
          <p className="font-spectral text-[#BFA98A] text-sm italic mt-0.5">
            {selectedPhone.tagline || "Enchanted communication stone"}
          </p>
        </div>

        <div className="text-left md:text-right">
          <span className="text-xs font-cinzel text-[#BFA98A] uppercase tracking-wider block">
            Acquisition Tribute
          </span>
          <span className="font-cinzel text-2xl lg:text-3xl font-bold text-[#CA8A04] quest-glow-sm">
            {formatPrice(selectedPhone.giaBan)}
          </span>
          <span className="font-spectral text-sm text-[#BFA98A] ml-1">VNĐ</span>
        </div>
      </div>

      {/* Grid Layout: Left image preview, Right spec grimoire */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Image & Quick Actions */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="relative w-full rounded-[4px] border border-[#5C3D2E] bg-[#1A0F0A]/90 p-8 flex items-center justify-center min-h-[320px] shadow-inner">
            <div className="absolute inset-0 bg-radial from-[#CA8A04]/10 via-transparent to-transparent pointer-events-none" />
            <img
              src={selectedPhone.hinhAnh}
              alt={selectedPhone.tenSP}
              className="max-h-72 w-auto object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)] transition-transform duration-300 hover:scale-105"
            />
          </div>

          {selectedPhone.lore && (
            <div className="mt-4 p-4 rounded-[4px] border border-[#5C3D2E]/60 bg-[#1A0F0A]/40 w-full">
              <p className="text-xs font-cinzel uppercase tracking-wider text-[#CA8A04] mb-1">
                Artifact Lore:
              </p>
              <p className="font-spectral text-sm text-[#BFA98A] italic leading-relaxed">
                "{selectedPhone.lore}"
              </p>
            </div>
          )}

          <button
            onClick={() => onAddToCart && onAddToCart(selectedPhone)}
            className="mt-5 w-full py-3 px-6 text-sm font-cinzel font-bold tracking-widest uppercase rounded-[4px] border border-[#DAA520] bg-[#CA8A04] text-[#1A0F0A] hover:bg-[#B8780A] hover:quest-glow-active transition-all duration-200 cursor-pointer shadow-md"
          >
            ⚔️ Thêm Vào Túi Đồ (Add to Inventory)
          </button>
        </div>

        {/* Right Column: Specification Table */}
        <div className="lg:col-span-7">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-cinzel text-lg font-bold text-[#CA8A04] tracking-wide flex items-center gap-2">
              <span>📜</span> Bảng Thông Số Kỹ Thuật (Grimoire Specs)
            </h3>
            <span className="text-xs font-cinzel text-[#22C55E] bg-[#22C55E]/10 border border-[#22C55E]/30 px-2 py-0.5 rounded-[2px]">
              ● VERIFIED IN STOCK
            </span>
          </div>

          <div className="overflow-hidden rounded-[4px] border border-[#5C3D2E] bg-[#1A0F0A]/60">
            <table className="w-full text-left font-spectral text-sm">
              <tbody>
                {specRows.map((row, index) => (
                  <tr
                    key={index}
                    className={`border-b border-[#3D2517] transition-colors hover:bg-[#3D2517]/50 ${
                      index % 2 === 0 ? "bg-[#2C1A10]" : "bg-[#24150D]"
                    }`}
                  >
                    <th className="py-3.5 px-4 font-spectral font-medium text-[#BFA98A] w-2/5 flex items-center gap-2">
                      <span>{row.icon}</span>
                      <span>{row.label}</span>
                    </th>
                    <td className="py-3.5 px-4 text-[#F5E6D3] font-spectral font-semibold">
                      {row.value || "Chưa có thông tin"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Guarantee Badges */}
          <div className="mt-6 grid grid-cols-3 gap-3 text-center text-xs font-cinzel text-[#BFA98A]">
            <div className="p-3 rounded-[2px] border border-[#5C3D2E]/60 bg-[#1A0F0A]/50">
              <div className="text-[#CA8A04] text-base mb-1">🛡️</div>
              <div>Bảo Hành 12 Tháng</div>
            </div>
            <div className="p-3 rounded-[2px] border border-[#5C3D2E]/60 bg-[#1A0F0A]/50">
              <div className="text-[#CA8A04] text-base mb-1">⚡</div>
              <div>Giao Hàng Thần Tốc</div>
            </div>
            <div className="p-3 rounded-[2px] border border-[#5C3D2E]/60 bg-[#1A0F0A]/50">
              <div className="text-[#CA8A04] text-base mb-1">🔄</div>
              <div>1 Đổi 1 Trong 30 Ngày</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
