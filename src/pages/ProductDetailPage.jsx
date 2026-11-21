import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import initialPhones from "../shopping-phone/data.json";

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [addedToast, setAddedToast] = useState(false);

  // Find product by id from useParams
  const product = initialPhones.find((p) => p.maSP === parseInt(id, 10));

  useDocumentTitle(product ? product.tenSP : "Không tìm thấy sản phẩm");

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="text-5xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold text-white">Không tìm thấy sản phẩm</h2>
        <p className="text-sm text-slate-400 mt-2 mb-6">
          Sản phẩm với mã ID #{id} không tồn tại hoặc đã ngừng kinh doanh.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 text-black font-semibold text-sm hover:bg-amber-400 transition-all"
        >
          ← Quay về cửa hàng
        </Link>
      </div>
    );
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2500);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate("/checkout");
  };

  const specRows = [
    { label: "Màn hình", value: product.manHinh, icon: "📱" },
    { label: "Hệ điều hành", value: product.heDieuHanh, icon: "⚙️" },
    { label: "Camera trước", value: product.cameraTruoc, icon: "🤳" },
    { label: "Camera sau", value: product.cameraSau, icon: "📸" },
    { label: "Dung lượng RAM", value: product.ram, icon: "⚡" },
    { label: "Bộ nhớ trong (ROM)", value: product.rom, icon: "💾" },
  ];

  return (
    <div className="container mx-auto px-4 lg:px-8 py-10">
      {/* Toast Notification */}
      {addedToast && (
        <div className="fixed bottom-6 right-6 z-50 rounded-2xl border border-white/10 bg-[#1C140F]/95 backdrop-blur-md px-5 py-3.5 shadow-2xl flex items-center gap-3 animate-bounce">
          <span className="text-amber-400 text-lg">✓</span>
          <span className="text-sm font-semibold text-slate-100">
            Đã thêm {quantity} {product.tenSP} vào giỏ hàng!
          </span>
        </div>
      )}

      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-slate-400 mb-8">
        <Link to="/" className="hover:text-amber-400 transition-colors">
          Trang chủ
        </Link>
        <span>/</span>
        <Link to="/" className="hover:text-amber-400 transition-colors">
          Điện thoại
        </Link>
        <span>/</span>
        <span className="text-slate-200 font-semibold">{product.tenSP}</span>
      </nav>

      {/* Main Product Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Big Product Image */}
        <div className="lg:col-span-6 flex flex-col items-center">
          <div className="relative w-full rounded-3xl bg-[#160E0A] border border-white/10 p-10 flex items-center justify-center min-h-[420px] shadow-2xl">
            <div className="absolute inset-0 bg-radial from-amber-500/10 via-transparent to-transparent pointer-events-none" />
            <img
              src={product.hinhAnh}
              alt={product.tenSP}
              className="max-h-96 w-auto object-contain drop-shadow-[0_25px_40px_rgba(0,0,0,0.8)]"
            />
          </div>

          {/* Quick Perks */}
          <div className="grid grid-cols-3 gap-3 w-full mt-6 text-center text-xs">
            <div className="p-3.5 rounded-xl border border-white/5 bg-[#140E0A]">
              <div className="text-lg mb-1">🛡️</div>
              <div className="font-semibold text-slate-200">12 Tháng Bảo Hành</div>
              <div className="text-[11px] text-slate-500">Chính hãng tại trung tâm</div>
            </div>
            <div className="p-3.5 rounded-xl border border-white/5 bg-[#140E0A]">
              <div className="text-lg mb-1">⚡</div>
              <div className="font-semibold text-slate-200">Giao Nhanh 2h</div>
              <div className="text-[11px] text-slate-500">Miễn phí toàn quốc</div>
            </div>
            <div className="p-3.5 rounded-xl border border-white/5 bg-[#140E0A]">
              <div className="text-lg mb-1">🔄</div>
              <div className="font-semibold text-slate-200">Đổi Trả 30 Ngày</div>
              <div className="text-[11px] text-slate-500">Nếu lỗi nhà sản xuất</div>
            </div>
          </div>
        </div>

        {/* Right: Info, Price, Quantity & Add to Cart */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-400 bg-amber-500/10 rounded-full border border-amber-500/20">
                {product.brand} • {product.badge}
              </span>
              <span className="text-xs text-slate-500">
                Mã SP: #{product.maSP.toString().padStart(4, "0")}
              </span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              {product.tenSP}
            </h1>
            <p className="text-slate-400 text-sm mt-2 leading-relaxed">
              {product.moTaNgan}
            </p>
          </div>

          {/* Price Box */}
          <div className="p-5 rounded-2xl bg-[#1C130D] border border-white/10 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 block">Giá khuyến mãi</span>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-amber-400 tracking-tight">
                  {formatPrice(product.giaBan)}
                </span>
                <span className="text-sm font-semibold text-slate-400">₫</span>
              </div>
            </div>
            <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              ● Còn hàng trong kho
            </span>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-slate-400">Số lượng:</span>
            <div className="flex items-center gap-2 bg-[#160E0A] px-3 py-1.5 rounded-xl border border-white/10">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-7 h-7 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 flex items-center justify-center font-bold text-sm transition-colors cursor-pointer"
              >
                -
              </button>
              <span className="text-sm font-semibold w-8 text-center text-white">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="w-7 h-7 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 flex items-center justify-center font-bold text-sm transition-colors cursor-pointer"
              >
                +
              </button>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              onClick={handleAddToCart}
              className="py-3.5 px-6 text-sm font-bold rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>🛒</span>
              <span>Thêm vào giỏ</span>
            </button>
            <button
              onClick={handleBuyNow}
              className="py-3.5 px-6 text-sm font-bold rounded-xl bg-amber-500 hover:bg-amber-400 text-black shadow-lg shadow-amber-500/25 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>⚡</span>
              <span>Mua ngay</span>
            </button>
          </div>

          {/* Specifications Table */}
          <div className="pt-6 border-t border-white/10">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <span>📋</span> Bảng thông số kỹ thuật
            </h3>
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#160E0A]">
              <table className="w-full text-left text-sm">
                <tbody>
                  {specRows.map((row, index) => (
                    <tr
                      key={index}
                      className={`border-b border-white/5 transition-colors ${
                        index % 2 === 0 ? "bg-[#1A120D]" : "bg-[#140D08]"
                      }`}
                    >
                      <th className="py-3.5 px-4 font-medium text-slate-400 w-2/5 flex items-center gap-2">
                        <span>{row.icon}</span>
                        <span>{row.label}</span>
                      </th>
                      <td className="py-3.5 px-4 text-slate-200 font-semibold">
                        {row.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
