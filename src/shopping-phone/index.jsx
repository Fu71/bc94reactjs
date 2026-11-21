import { useState } from "react";
import ListPhone from "./list-phone";
import Detail from "./detail";
import CartModal from "./cart-modal";
import initialData from "./data.json";

export default function ShoppingPhone() {
  const [listPhone] = useState(initialData);
  const [selectedPhone, setSelectedPhone] = useState(initialData[0] || null);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRarity, setSelectedRarity] = useState("ALL");
  const [toastMessage, setToastMessage] = useState(null);

  /**
   * Xem chi tiết sản phẩm
   */
  const handleDetailPhone = (phone) => {
    setSelectedPhone(phone);
    // Smooth scroll to detail section
    const detailEl = document.getElementById("detail-section");
    if (detailEl) {
      detailEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  /**
   * Thêm sản phẩm vào giỏ hàng
   */
  const handleAddToCart = (phone) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.maSP === phone.maSP);
      if (existingIndex !== -1) {
        const newCart = [...prevCart];
        newCart[existingIndex].soLuong += 1;
        return newCart;
      } else {
        return [...prevCart, { ...phone, soLuong: 1 }];
      }
    });

    // Show temporary toast notification
    setToastMessage(`Đã thêm "${phone.tenSP}" vào túi đồ!`);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  /**
   * Tăng / giảm số lượng
   */
  const handleUpdateQuantity = (maSP, delta) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.maSP === maSP) {
            const newQty = item.soLuong + delta;
            return newQty > 0 ? { ...item, soLuong: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  /**
   * Xóa 1 sản phẩm khỏi giỏ
   */
  const handleRemoveItem = (maSP) => {
    setCart((prevCart) => prevCart.filter((item) => item.maSP !== maSP));
  };

  /**
   * Xóa toàn bộ giỏ
   */
  const handleClearCart = () => {
    setCart([]);
  };

  // Filter phones by search query and rarity filter chip
  const filteredPhones = listPhone.filter((phone) => {
    const matchesSearch =
      phone.tenSP.toLowerCase().includes(searchQuery.toLowerCase()) ||
      phone.manHinh.toLowerCase().includes(searchQuery.toLowerCase()) ||
      phone.heDieuHanh.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRarity =
      selectedRarity === "ALL" ||
      (selectedRarity === "LEGENDARY" && phone.rarity === "LEGENDARY") ||
      (selectedRarity === "ARCANE RARE" && phone.rarity === "ARCANE RARE") ||
      (selectedRarity === "MYTHIC CROWN" && phone.rarity === "MYTHIC CROWN");

    return matchesSearch && matchesRarity;
  });

  const totalCartCount = cart.reduce((total, item) => total + item.soLuong, 0);

  return (
    <div className="min-h-screen bg-[#1A0F0A] text-[#F5E6D3]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 rounded-[4px] border border-[#CA8A04] bg-[#2C1A10] px-5 py-3 shadow-[0_0_20px_rgba(202,138,4,0.35)] flex items-center gap-3 animate-bounce">
          <span className="text-[#CA8A04] text-lg">✨</span>
          <span className="font-spectral text-sm text-[#F5E6D3]">{toastMessage}</span>
        </div>
      )}

      {/* Cart Modal / Inventory */}
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Top Medieval Navigation Bar */}
      <header className="sticky top-0 z-40 border-b border-[#5C3D2E] bg-[#1A0F0A]/95 backdrop-blur-md">
        <div className="container mx-auto px-4 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[4px] border border-[#CA8A04] bg-[#2C1A10] flex items-center justify-center text-xl quest-glow-sm">
              🛡️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-cinzel text-lg lg:text-xl font-bold tracking-wider text-[#CA8A04] uppercase">
                  QuestUI
                </h1>
                <span className="text-xs text-[#5C3D2E]">/</span>
                <span className="font-cinzel text-xs lg:text-sm font-semibold tracking-wider text-[#F5E6D3]">
                  Arcane Emporium
                </span>
              </div>
              <p className="font-spectral text-xs text-[#BFA98A] italic">
                Cửa Hàng Thiết Bị & Khí Giới Di Động Hoàng Gia
              </p>
            </div>
          </div>

          {/* Right Action: Cart / Inventory Button */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative inline-flex items-center gap-2.5 px-4 py-2 text-xs font-cinzel font-bold tracking-wider uppercase rounded-[4px] border border-[#CA8A04] text-[#CA8A04] bg-[#2C1A10] hover:bg-[#3D2517] hover:quest-glow transition-all duration-200 cursor-pointer"
            >
              <span>🎒</span>
              <span>Túi Đồ</span>
              {totalCartCount > 0 && (
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#CA8A04] text-[#1A0F0A] text-[11px] font-fira font-bold shadow-sm">
                  {totalCartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="container mx-auto px-4 lg:px-8 py-10">
        {/* Ornate Quest Banner / Hero */}
        <section className="relative rounded-[4px] border border-[#5C3D2E] bg-[#2C1A10] p-6 lg:p-10 mb-10 quest-glow overflow-hidden">
          {/* 2px gold top accent */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#CA8A04]" />
          
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-0.5 text-[11px] font-cinzel uppercase tracking-[1px] rounded-[2px] bg-[#CA8A04]/20 text-[#CA8A04] border border-[#CA8A04]/30">
                ✦ ROYAL ARMORY VAULT ✦
              </span>
              <span className="text-xs font-fira text-[#BFA98A]">VER: BC94-PROD</span>
            </div>

            <h2 className="font-cinzel text-2xl lg:text-4xl font-bold tracking-wide text-[#F5E6D3] leading-tight">
              Kho Khí Giới Truyền Tin & Thiết Bị Thông Minh
            </h2>

            <p className="font-spectral text-sm lg:text-base text-[#BFA98A] mt-3 leading-relaxed">
              Chào mừng bạn đến với kho lưu trữ thiết bị di động hoàng gia. Từng tạo tác đều được rèn đúc với tinh thể màn hình sắc nét, camera thấu thị và nguồn năng lượng xử lý mạnh mẽ. Hãy chọn một bảo vật để thám thính thông số chi tiết.
            </p>
          </div>

          {/* Quick filter chips & Search bar */}
          <div className="mt-8 pt-6 border-t border-[#5C3D2E]/50 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Input following QuestUI Input spec */}
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm theo tên hoặc thông số..."
                className="w-full h-10 px-4 pl-10 rounded-[4px] border border-[#5C3D2E] bg-[#1A0F0A] text-[#F5E6D3] font-spectral text-sm placeholder-[#BFA98A]/50 focus:outline-none focus:border-[#CA8A04] focus:ring-2 focus:ring-[#CA8A04]/25 transition-all"
              />
              <span className="absolute left-3.5 top-2.5 text-sm text-[#BFA98A]">🔍</span>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-2.5 text-xs text-[#BFA98A] hover:text-[#CA8A04]"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Rarity Chips following QuestUI Chips spec */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: "ALL", label: "Tất Cả (All)" },
                { id: "LEGENDARY", label: "Legendary" },
                { id: "ARCANE RARE", label: "Arcane" },
                { id: "MYTHIC CROWN", label: "Mythic" },
              ].map((chip) => (
                <button
                  key={chip.id}
                  onClick={() => setSelectedRarity(chip.id)}
                  className={`px-3 py-1.5 rounded-[2px] text-[11px] font-cinzel uppercase tracking-[1px] transition-all cursor-pointer ${
                    selectedRarity === chip.id
                      ? "bg-[#CA8A04] text-[#1A0F0A] font-bold shadow-sm"
                      : "bg-[#1A0F0A] text-[#BFA98A] border border-[#5C3D2E] hover:border-[#CA8A04]/60 hover:text-[#F5E6D3]"
                  }`}
                >
                  {chip.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Section Heading */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-2 h-6 bg-[#CA8A04] rounded-[1px]" />
            <h3 className="font-cinzel text-xl lg:text-2xl font-bold tracking-wide text-[#F5E6D3]">
              Danh Mục Sản Phẩm ({filteredPhones.length})
            </h3>
          </div>
          <span className="font-spectral text-xs text-[#BFA98A] italic">
            Hiển thị theo phong cách QuestUI
          </span>
        </div>

        {/* Product Grid */}
        <ListPhone
          listPhone={filteredPhones}
          onDetailPhone={handleDetailPhone}
          onAddToCart={handleAddToCart}
          selectedPhoneId={selectedPhone ? selectedPhone.maSP : null}
        />

        {/* Detail Specs Section */}
        <div id="detail-section">
          <Detail selectedPhone={selectedPhone} onAddToCart={handleAddToCart} />
        </div>
      </main>

      {/* Medieval RPG Footer */}
      <footer className="mt-20 border-t border-[#5C3D2E] bg-[#1A0F0A] py-12">
        <div className="container mx-auto px-4 lg:px-8 text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-xl font-cinzel text-[#CA8A04]">
            <span>⚔️</span>
            <span>QUESTUI DESIGN SYSTEM // BC94</span>
            <span>🛡️</span>
          </div>
          <p className="font-spectral text-sm text-[#BFA98A] max-w-md mx-auto">
            Hệ thống giao diện được thiết kế theo chuẩn QuestUI Token: màu vàng ánh kim (#CA8A04), nền gỗ tối (#1A0F0A), font chữ Cinzel & Spectral.
          </p>
          <div className="text-xs font-fira text-[#BFA98A]/60">
            Deployed on Vercel • Built with React 19 & Tailwind CSS
          </div>
        </div>
      </footer>
    </div>
  );
}
