import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import Detail from "../shopping-phone/detail";
import { useCart } from "../context/CartContext";
import { useDebounce } from "../hooks/useDebounce";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import initialPhones from "../shopping-phone/data.json";

export default function HomePage() {
  useDocumentTitle("Cửa Hàng Điện Thoại Chính Hãng");

  const { addToCart } = useCart();
  const [phones] = useState(initialPhones);
  const [selectedPhone, setSelectedPhone] = useState(initialPhones[0] || null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("ALL");

  // Debounced search query (Custom Hook)
  const debouncedSearch = useDebounce(searchQuery, 300);

  // Featured flagship phone (iPhone XS Max)
  const featuredPhone = phones.find((p) => p.maSP === 3) || phones[0];

  // Memoized filtered product list (useMemo Hook)
  const filteredPhones = useMemo(() => {
    return phones.filter((phone) => {
      const query = debouncedSearch.toLowerCase().trim();
      const matchesSearch =
        !query ||
        phone.tenSP.toLowerCase().includes(query) ||
        phone.manHinh.toLowerCase().includes(query) ||
        phone.brand.toLowerCase().includes(query);

      const matchesBrand =
        selectedBrand === "ALL" || phone.brand.toUpperCase() === selectedBrand;

      return matchesSearch && matchesBrand;
    });
  }, [phones, debouncedSearch, selectedBrand]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price);
  };

  return (
    <div className="container mx-auto px-4 lg:px-8 py-10">
      {/* 2-Column Hero Section */}
      <section className="relative rounded-3xl bg-gradient-to-br from-[#1C130D] via-[#160E0A] to-[#120B07] border border-white/10 p-8 lg:p-12 mb-16 shadow-2xl overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Heading, Search & Brand Filters */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-semibold text-amber-400">
              <span>✨</span>
              <span>Bộ sưu tập công nghệ đỉnh cao 2026</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
              Trải nghiệm thế hệ <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500">
                điện thoại thông minh
              </span>{" "}
              vượt trội
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
              Cung cấp các dòng smartphone chính hãng với màn hình OLED sắc nét, cấu hình mạnh mẽ, hỗ trợ giao hàng nhanh và bảo hành 1 đổi 1.
            </p>

            {/* Search Input with useDebounce */}
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

          {/* Right Column: Featured Flagship Showcase */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md rounded-3xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/10 p-6 lg:p-7 shadow-2xl backdrop-blur-xl group hover:border-amber-500/30 transition-all duration-300">
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 rounded-full border border-amber-500/20">
                  🔥 Nổi bật nhất tuần
                </span>
                <span className="text-xs text-slate-400">Flagship</span>
              </div>

              <Link
                to={`/product/${featuredPhone.maSP}`}
                className="relative my-4 flex h-52 items-center justify-center cursor-pointer block"
              >
                <div className="absolute inset-0 bg-radial from-amber-500/15 via-transparent to-transparent blur-xl" />
                <img
                  src={featuredPhone.hinhAnh}
                  alt={featuredPhone.tenSP}
                  className="max-h-48 w-auto object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)] transition-transform duration-500 group-hover:scale-105"
                />
              </Link>

              <div className="space-y-1">
                <Link to={`/product/${featuredPhone.maSP}`}>
                  <h3 className="text-2xl font-bold text-white hover:text-amber-400 transition-colors">
                    {featuredPhone.tenSP}
                  </h3>
                </Link>
                <p className="text-xs text-slate-400">
                  Màn hình Super Retina OLED 6.5 inch • Chip A12 Bionic
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 block">Ưu đãi hôm nay</span>
                  <span className="text-2xl font-extrabold text-amber-400 tracking-tight">
                    {formatPrice(featuredPhone.giaBan)} ₫
                  </span>
                </div>
                <Link
                  to={`/product/${featuredPhone.maSP}`}
                  className="py-2.5 px-4 text-xs font-bold rounded-xl bg-amber-500 hover:bg-amber-400 text-black shadow-md shadow-amber-500/20 transition-all"
                >
                  Xem chi tiết →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Catalog Grid */}
      <section id="catalog" className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold text-white tracking-tight">
              Danh Mục Sản Phẩm
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Đang hiển thị {filteredPhones.length} sản phẩm
            </p>
          </div>
        </div>

        {filteredPhones.length === 0 ? (
          <div className="rounded-2xl border border-white/5 bg-[#18110D] p-12 text-center my-8">
            <div className="mx-auto w-12 h-12 mb-3 text-slate-400 flex items-center justify-center bg-white/5 rounded-full text-xl">
              🔍
            </div>
            <h3 className="text-lg font-semibold text-slate-100">
              Không tìm thấy sản phẩm phù hợp
            </h3>
            <p className="text-sm text-slate-400 mt-1">
              Vui lòng thử tìm kiếm bằng từ khóa hoặc bộ lọc thương hiệu khác.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredPhones.map((phone) => (
              <ProductCard
                key={phone.maSP}
                phone={phone}
                onSelectPhone={setSelectedPhone}
                isSelected={selectedPhone ? selectedPhone.maSP === phone.maSP : false}
              />
            ))}
          </div>
        )}
      </section>

      {/* Quick Spec Inspection Panel */}
      <div id="detail-section">
        <Detail selectedPhone={selectedPhone} onAddToCart={addToCart} />
      </div>
    </div>
  );
}
