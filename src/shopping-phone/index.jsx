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
  const [selectedBrand, setSelectedBrand] = useState("ALL");
  const [toastMessage, setToastMessage] = useState(null);

  // Featured flagship phone (iPhone XS Max)
  const featuredPhone = listPhone.find((p) => p.maSP === 3) || listPhone[0];

  const handleDetailPhone = (phone) => {
    setSelectedPhone(phone);
    const detailEl = document.getElementById("detail-section");
    if (detailEl) {
      detailEl.scrollIntoView({ behavior: "smooth" });
    }
  };

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

    setToastMessage(`Đã thêm "${phone.tenSP}" vào giỏ hàng!`);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

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

  const handleRemoveItem = (maSP) => {
    setCart((prevCart) => prevCart.filter((item) => item.maSP !== maSP));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const filteredPhones = listPhone.filter((phone) => {
    const matchesSearch =
      phone.tenSP.toLowerCase().includes(searchQuery.toLowerCase()) ||
      phone.manHinh.toLowerCase().includes(searchQuery.toLowerCase()) ||
      phone.brand.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesBrand =
      selectedBrand === "ALL" || phone.brand.toUpperCase() === selectedBrand;

    return matchesSearch && matchesBrand;
  });

  const totalCartCount = cart.reduce((total, item) => total + item.soLuong, 0);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price);
  };

  return (
    <div className="min-h-screen bg-[#0F0A07] text-[#F1F5F9]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 rounded-2xl border border-white/10 bg-[#1C140F]/95 backdrop-blur-md px-5 py-3.5 shadow-2xl flex items-center gap-3 animate-bounce">
          <span className="text-amber-400 text-lg">✓</span>
          <span className="text-sm font-semibold text-slate-100">{toastMessage}</span>
        </div>
      )}

      {/* Cart Modal */}
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Modern Clean Navbar */}
      <header className="sticky top-0 z-40 border-b border-white/5 bg-[#0F0A07]/90 backdrop-blur-xl">
        <div className="container mx-auto px-4 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-lg text-black font-extrabold shadow-md shadow-amber-500/20">
              ⚡
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-extrabold tracking-tight text-white font-brand">
                  TECH<span className="text-amber-400">ZONE</span>
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Thế Giới Điện Thoại Thông Minh Chính Hãng
              </p>
            </div>
          </div>

          {/* Cart CTA */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative inline-flex items-center gap-2.5 px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 hover:text-white transition-all cursor-pointer"
          >
            <span>🛒</span>
            <span>Giỏ hàng</span>
            {totalCartCount > 0 && (
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-amber-500 text-black text-[11px] font-extrabold shadow-md">
                {totalCartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 lg:px-8 py-10">
        {/* Split Hero Section: 2 Columns */}
        <section className="relative rounded-3xl bg-gradient-to-br from-[#1C130D] via-[#160E0A] to-[#120B07] border border-white/10 p-8 lg:p-12 mb-16 shadow-2xl overflow-hidden">
          {/* Subtle background ambient glow */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Message, Search, and Category Filters */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-semibold text-amber-400">
                <span>✨</span>
                <span>Khám phá công nghệ đỉnh cao 2026</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
                Trải nghiệm thế hệ <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500">
                  điện thoại thông minh
                </span>{" "}
                vượt trội
              </h1>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
                Cung cấp các dòng smartphone chính hãng với màn hình OLED sắc nét, hiệu năng đột phá cùng chế độ bảo hành và giao hàng tận nơi siêu tốc.
              </p>

              {/* Modern Search Input */}
              <div className="relative max-w-lg">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm kiếm theo tên máy, màn hình, thương hiệu..."
                  className="w-full h-12 px-5 pl-12 rounded-2xl bg-black/40 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all shadow-inner"
                />
                <span className="absolute left-4 top-3.5 text-base text-slate-400">🔍</span>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-3.5 text-xs text-slate-400 hover:text-white"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Brand Filter Pills */}
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <span className="text-xs font-medium text-slate-400 mr-1">Thương hiệu:</span>
                {[
                  { id: "ALL", label: "Tất cả" },
                  { id: "APPLE", label: "Apple" },
                  { id: "VINSMART", label: "VinSmart" },
                  { id: "MEIZU", label: "Meizu" },
                ].map((brand) => (
                  <button
                    key={brand.id}
                    onClick={() => setSelectedBrand(brand.id)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      selectedBrand === brand.id
                        ? "bg-amber-500 text-black shadow-md shadow-amber-500/20"
                        : "bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/5"
                    }`}
                  >
                    {brand.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column: Featured Product Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md rounded-3xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/10 p-6 lg:p-7 shadow-2xl backdrop-blur-xl group hover:border-amber-500/30 transition-all duration-300">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 rounded-full border border-amber-500/20">
                    🔥 Nổi bật nhất tuần
                  </span>
                  <span className="text-xs text-slate-400">Flagship</span>
                </div>

                <div className="relative my-4 flex h-52 items-center justify-center">
                  <div className="absolute inset-0 bg-radial from-amber-500/15 via-transparent to-transparent blur-xl" />
                  <img
                    src={featuredPhone.hinhAnh}
                    alt={featuredPhone.tenSP}
                    className="max-h-48 w-auto object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)] transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="space-y-1">
                  <h3 className="text-2xl font-bold text-white">
                    {featuredPhone.tenSP}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Màn hình Super Retina OLED 6.5 inch • A12 Bionic
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 block">Ưu đãi hôm nay</span>
                    <span className="text-2xl font-extrabold text-amber-400 tracking-tight">
                      {formatPrice(featuredPhone.giaBan)} ₫
                    </span>
                  </div>
                  <button
                    onClick={() => handleDetailPhone(featuredPhone)}
                    className="py-2.5 px-4 text-xs font-bold rounded-xl bg-amber-500 hover:bg-amber-400 text-black shadow-md shadow-amber-500/20 transition-all cursor-pointer"
                  >
                    Khám phá ngay →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Catalog Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold text-white tracking-tight">
              Danh Sách Sản Phẩm
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Đang hiển thị {filteredPhones.length} sản phẩm theo lựa chọn của bạn
            </p>
          </div>
        </div>

        {/* Product Grid */}
        <ListPhone
          listPhone={filteredPhones}
          onDetailPhone={handleDetailPhone}
          onAddToCart={handleAddToCart}
          selectedPhoneId={selectedPhone ? selectedPhone.maSP : null}
        />

        {/* Detailed Specs Section */}
        <div id="detail-section">
          <Detail selectedPhone={selectedPhone} onAddToCart={handleAddToCart} />
        </div>
      </main>

      {/* Clean Modern Footer */}
      <footer className="mt-24 border-t border-white/5 bg-[#0A0704] py-12">
        <div className="container mx-auto px-4 lg:px-8 text-center space-y-3">
          <div className="text-lg font-bold text-white font-brand">
            TECH<span className="text-amber-400">ZONE</span>
          </div>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Dự án giao diện E-Commerce hiện đại, tối ưu trải nghiệm người dùng, xây dựng với ReactJS và Tailwind CSS.
          </p>
          <div className="text-[11px] text-slate-600">
            © 2026 TechZone Store • Deployed on Vercel
          </div>
        </div>
      </footer>
    </div>
  );
}
