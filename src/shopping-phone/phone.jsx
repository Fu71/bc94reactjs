export default function Phone(props) {
  const { phone, onDetailPhone, onAddToCart, isSelected } = props;

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price);
  };

  const getRarityBadge = (rarity) => {
    switch (rarity) {
      case "MYTHIC CROWN":
        return (
          <span className="px-2.5 py-0.5 text-[11px] font-cinzel uppercase tracking-[1px] rounded-[2px] bg-[#581C87]/40 text-[#D8B4FE] border border-[#A855F7]/40">
            ✦ {rarity}
          </span>
        );
      case "LEGENDARY":
        return (
          <span className="px-2.5 py-0.5 text-[11px] font-cinzel uppercase tracking-[1px] rounded-[2px] bg-[#CA8A04]/20 text-[#FACC15] border border-[#CA8A04]/40">
            ★ {rarity}
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-0.5 text-[11px] font-cinzel uppercase tracking-[1px] rounded-[2px] bg-[#2C1A10] text-[#BFA98A] border border-[#5C3D2E]">
            ◆ {rarity || "RARE RELIC"}
          </span>
        );
    }
  };

  return (
    <div
      className={`group relative flex flex-col justify-between rounded-[4px] border transition-all duration-300 ${
        isSelected
          ? "bg-[#3D2517] border-[#CA8A04] quest-glow-active"
          : "bg-[#2C1A10] border-[#5C3D2E] hover:bg-[#3D2517] hover:border-[#CA8A04]/50 quest-glow-sm hover:quest-glow-md"
      }`}
    >
      {/* 2px Gold top border accent as per QuestUI card spec */}
      <div
        className={`h-[2px] w-full transition-colors ${
          isSelected ? "bg-[#CA8A04]" : "bg-[#CA8A04]/70 group-hover:bg-[#CA8A04]"
        }`}
      />

      <div className="p-5 flex flex-col h-full">
        {/* Rarity & Tier Row */}
        <div className="flex items-center justify-between mb-4">
          {getRarityBadge(phone.rarity)}
          <span className="text-[12px] font-spectral text-[#BFA98A] italic">
            {phone.tier || "Artifact"}
          </span>
        </div>

        {/* Relic Image with Ornate Frame */}
        <div className="relative mb-5 flex items-center justify-center overflow-hidden rounded-[2px] bg-[#1A0F0A]/70 border border-[#5C3D2E]/60 p-4 min-h-[220px]">
          <div className="absolute inset-0 bg-radial from-[#CA8A04]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <img
            src={phone.hinhAnh}
            alt={phone.tenSP}
            className="h-44 w-auto object-contain transition-transform duration-500 ease-out group-hover:scale-105 drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
          />
        </div>

        {/* Item Info */}
        <div className="flex-1">
          <h3 className="font-cinzel text-xl font-bold tracking-wide text-[#F5E6D3] group-hover:text-[#CA8A04] transition-colors">
            {phone.tenSP}
          </h3>
          <p className="font-spectral text-sm text-[#BFA98A] mt-1 line-clamp-1 italic">
            {phone.tagline || phone.manHinh}
          </p>

          {/* Key Specs Pills */}
          <div className="mt-3 flex flex-wrap gap-2 text-xs font-fira text-[#BFA98A]">
            <span className="bg-[#1A0F0A] px-2 py-0.5 rounded-[2px] border border-[#5C3D2E]/40">
              ⚡ {phone.ram}
            </span>
            <span className="bg-[#1A0F0A] px-2 py-0.5 rounded-[2px] border border-[#5C3D2E]/40">
              💾 {phone.rom}
            </span>
          </div>
        </div>

        {/* Price & Divider */}
        <div className="mt-5 pt-4 border-t border-[#5C3D2E]/50">
          <div className="flex items-baseline justify-between mb-4">
            <span className="text-xs font-cinzel tracking-wider text-[#BFA98A] uppercase">
              Tribute
            </span>
            <div className="text-right">
              <span className="font-cinzel text-xl font-bold text-[#CA8A04] quest-glow-sm">
                {formatPrice(phone.giaBan)}
              </span>
              <span className="font-spectral text-xs text-[#BFA98A] ml-1">VNĐ</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onDetailPhone(phone)}
              className="inline-flex items-center justify-center px-3 py-2 text-xs font-cinzel font-semibold tracking-wider uppercase rounded-[4px] border border-[#CA8A04] text-[#CA8A04] bg-transparent hover:bg-[#CA8A04]/15 transition-all duration-200 cursor-pointer"
            >
              Xem Chi Tiết
            </button>
            <button
              onClick={() => onAddToCart && onAddToCart(phone)}
              className="inline-flex items-center justify-center px-3 py-2 text-xs font-cinzel font-semibold tracking-wider uppercase rounded-[4px] border border-[#DAA520] bg-[#CA8A04] text-[#1A0F0A] hover:bg-[#B8780A] hover:shadow-[0_0_15px_rgba(202,138,4,0.4)] transition-all duration-200 cursor-pointer"
            >
              + Thêm Giỏ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
