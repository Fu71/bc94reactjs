import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useCart } from "../context/CartContext";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export default function CheckoutPage() {
  useDocumentTitle("Thanh Toán Đơn Hàng");
  const navigate = useNavigate();
  const { cart, totalPrice, clearCart } = useCart();
  const [orderSuccess, setOrderSuccess] = useState(null);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price);
  };

  // Yup Validation Schema
  const validationSchema = Yup.object({
    fullName: Yup.string()
      .min(3, "Họ và tên tối thiểu 3 ký tự")
      .max(50, "Họ và tên tối đa 50 ký tự")
      .required("Vui lòng nhập họ và tên người nhận"),
    email: Yup.string()
      .email("Email không hợp lệ (Ví dụ: user@example.com)")
      .required("Vui lòng nhập địa chỉ email"),
    phone: Yup.string()
      .matches(
        /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
        "Số điện thoại không hợp lệ (Gồm 10 số, bắt đầu bằng 03, 05, 07, 08, 09)"
      )
      .required("Vui lòng nhập số điện thoại giao hàng"),
    city: Yup.string().required("Vui lòng chọn Tỉnh / Thành phố"),
    address: Yup.string()
      .min(8, "Địa chỉ chi tiết cần ít nhất 8 ký tự")
      .required("Vui lòng nhập số nhà, tên đường, phường/xã"),
    paymentMethod: Yup.string().required("Vui lòng chọn phương thức thanh toán"),
    terms: Yup.boolean().oneOf([true], "Vui lòng xác nhận đồng ý với điều khoản mua hàng"),
    note: Yup.string().max(200, "Ghi chú không vượt quá 200 ký tự"),
  });

  // Formik Hook
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phone: "",
      city: "TP. Hồ Chí Minh",
      address: "",
      paymentMethod: "cod",
      note: "",
      terms: true,
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      // Giả lập gửi đơn hàng qua API bất đồng bộ
      await new Promise((resolve) => setTimeout(resolve, 800));

      const orderData = {
        orderId: `TZ-${Date.now().toString().slice(-6)}`,
        createdAt: new Date().toLocaleString("vi-VN"),
        customer: values,
        items: [...cart],
        total: totalPrice,
      };

      setOrderSuccess(orderData);
      clearCart();
      setSubmitting(false);
    },
  });

  // Order Success Receipt View
  if (orderSuccess) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-2xl text-center">
        <div className="rounded-3xl border border-white/10 bg-[#140E0A] p-8 lg:p-12 shadow-2xl space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-3xl flex items-center justify-center mx-auto">
            ✓
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full">
              Đặt hàng thành công
            </span>
            <h1 className="text-2xl lg:text-3xl font-extrabold text-white mt-3">
              Cảm ơn {orderSuccess.customer.fullName}!
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Đơn hàng <span className="text-amber-400 font-bold">#{orderSuccess.orderId}</span> của bạn đã được ghi nhận vào hệ thống.
            </p>
          </div>

          {/* Receipt Details */}
          <div className="rounded-2xl border border-white/5 bg-[#1B130E] p-6 text-left text-sm space-y-3">
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-slate-400">Thời gian đặt:</span>
              <span className="text-white font-medium">{orderSuccess.createdAt}</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-slate-400">Số điện thoại:</span>
              <span className="text-white font-medium">{orderSuccess.customer.phone}</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-slate-400">Địa chỉ giao:</span>
              <span className="text-white font-medium text-right max-w-xs">
                {orderSuccess.customer.address}, {orderSuccess.customer.city}
              </span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-slate-400">Hình thức thanh toán:</span>
              <span className="text-amber-400 font-semibold uppercase">
                {orderSuccess.customer.paymentMethod === "cod"
                  ? "Thanh toán khi nhận hàng (COD)"
                  : orderSuccess.customer.paymentMethod === "banking"
                  ? "Chuyển khoản ngân hàng"
                  : "Ví điện tử MoMo"}
              </span>
            </div>
            <div className="flex justify-between pt-2">
              <span className="text-white font-bold">Tổng thanh toán:</span>
              <span className="text-xl font-extrabold text-amber-400">
                {formatPrice(orderSuccess.total)} ₫
              </span>
            </div>
          </div>

          <div className="flex justify-center gap-4 pt-4">
            <Link
              to="/"
              className="py-3 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm shadow-lg shadow-amber-500/25 transition-all"
            >
              Tiếp tục mua hàng
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // If cart is empty and no order yet
  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center max-w-md">
        <div className="text-5xl mb-4">🛒</div>
        <h2 className="text-2xl font-bold text-white">Giỏ hàng của bạn đang trống</h2>
        <p className="text-sm text-slate-400 mt-2 mb-6">
          Vui lòng thêm sản phẩm vào giỏ trước khi tiến hành thanh toán.
        </p>
        <button
          onClick={() => navigate("/")}
          className="py-3 px-6 rounded-xl bg-amber-500 text-black font-bold text-sm hover:bg-amber-400 transition-all cursor-pointer"
        >
          ← Quay lại cửa hàng
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 lg:px-8 py-10">
      <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">
        Thanh Toán Đơn Hàng
      </h1>
      <p className="text-sm text-slate-400 mb-8">
        Vui lòng điền thông tin người nhận bên dưới để hoàn tất thủ tục giao hàng.
      </p>

      <form onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Formik Form */}
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-3xl border border-white/10 bg-[#160E0A] p-6 lg:p-8 shadow-2xl space-y-6">
              <h2 className="text-lg font-bold text-white flex items-center gap-2 pb-3 border-b border-white/10">
                <span>📍</span> Thông tin giao hàng (Formik + Yup Validation)
              </h2>

              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  Họ và tên người nhận <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Ví dụ: Nguyễn Văn A"
                  {...formik.getFieldProps("fullName")}
                  className={`w-full h-11 px-4 rounded-xl bg-black/40 border text-sm text-white placeholder-slate-500 focus:outline-none transition-all ${
                    formik.touched.fullName && formik.errors.fullName
                      ? "border-rose-500 focus:ring-2 focus:ring-rose-500/20"
                      : "border-white/10 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                  }`}
                />
                {formik.touched.fullName && formik.errors.fullName && (
                  <p className="text-xs text-rose-400 mt-1.5 flex items-center gap-1">
                    <span>⚠</span> {formik.errors.fullName}
                  </p>
                )}
              </div>

              {/* Email & Phone (Grid 2 cols) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">
                    Email <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="user@example.com"
                    {...formik.getFieldProps("email")}
                    className={`w-full h-11 px-4 rounded-xl bg-black/40 border text-sm text-white placeholder-slate-500 focus:outline-none transition-all ${
                      formik.touched.email && formik.errors.email
                        ? "border-rose-500 focus:ring-2 focus:ring-rose-500/20"
                        : "border-white/10 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                    }`}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <p className="text-xs text-rose-400 mt-1.5 flex items-center gap-1">
                      <span>⚠</span> {formik.errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">
                    Số điện thoại <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="0901234567"
                    {...formik.getFieldProps("phone")}
                    className={`w-full h-11 px-4 rounded-xl bg-black/40 border text-sm text-white placeholder-slate-500 focus:outline-none transition-all ${
                      formik.touched.phone && formik.errors.phone
                        ? "border-rose-500 focus:ring-2 focus:ring-rose-500/20"
                        : "border-white/10 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                    }`}
                  />
                  {formik.touched.phone && formik.errors.phone && (
                    <p className="text-xs text-rose-400 mt-1.5 flex items-center gap-1">
                      <span>⚠</span> {formik.errors.phone}
                    </p>
                  )}
                </div>
              </div>

              {/* City Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  Tỉnh / Thành phố <span className="text-rose-400">*</span>
                </label>
                <select
                  name="city"
                  {...formik.getFieldProps("city")}
                  className="w-full h-11 px-4 rounded-xl bg-black/40 border border-white/10 text-sm text-white focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all"
                >
                  <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                  <option value="Hà Nội">Hà Nội</option>
                  <option value="Đà Nẵng">Đà Nẵng</option>
                  <option value="Cần Thơ">Cần Thơ</option>
                  <option value="Hải Phòng">Hải Phòng</option>
                  <option value="Khác">Tỉnh thành khác</option>
                </select>
              </div>

              {/* Detail Address */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  Địa chỉ nhận hàng chi tiết <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  name="address"
                  placeholder="Số nhà, tên đường, phường/xã..."
                  {...formik.getFieldProps("address")}
                  className={`w-full h-11 px-4 rounded-xl bg-black/40 border text-sm text-white placeholder-slate-500 focus:outline-none transition-all ${
                    formik.touched.address && formik.errors.address
                      ? "border-rose-500 focus:ring-2 focus:ring-rose-500/20"
                      : "border-white/10 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                  }`}
                />
                {formik.touched.address && formik.errors.address && (
                  <p className="text-xs text-rose-400 mt-1.5 flex items-center gap-1">
                    <span>⚠</span> {formik.errors.address}
                  </p>
                )}
              </div>

              {/* Note */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  Ghi chú đơn hàng (Tùy chọn)
                </label>
                <textarea
                  name="note"
                  rows="2"
                  placeholder="Ghi chú thêm về giờ giao hàng hoặc hướng dẫn địa chỉ..."
                  {...formik.getFieldProps("note")}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all"
                />
              </div>

              {/* Payment Methods */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-3">
                  Phương thức thanh toán <span className="text-rose-400">*</span>
                </label>
                <div className="space-y-2">
                  {[
                    { id: "cod", label: "Thanh toán khi nhận hàng (COD)", icon: "💵" },
                    { id: "banking", label: "Chuyển khoản ngân hàng (QR Code)", icon: "🏦" },
                    { id: "momo", label: "Ví điện tử MoMo", icon: "📱" },
                  ].map((method) => (
                    <label
                      key={method.id}
                      className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                        formik.values.paymentMethod === method.id
                          ? "border-amber-500 bg-amber-500/10 text-white"
                          : "border-white/5 bg-black/30 text-slate-300 hover:border-white/10"
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.id}
                        checked={formik.values.paymentMethod === method.id}
                        onChange={formik.handleChange}
                        className="text-amber-500 focus:ring-amber-500"
                      />
                      <span>{method.icon}</span>
                      <span className="text-sm font-medium">{method.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Terms Checkbox */}
              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="terms"
                    checked={formik.values.terms}
                    onChange={formik.handleChange}
                    className="rounded text-amber-500 focus:ring-amber-500"
                  />
                  <span className="text-xs text-slate-300">
                    Tôi đồng ý với các chính sách bảo mật và điều khoản mua hàng của TechZone
                  </span>
                </label>
                {formik.touched.terms && formik.errors.terms && (
                  <p className="text-xs text-rose-400 mt-1">
                    {formik.errors.terms}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Order Review & Submit */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-white/10 bg-[#160E0A] p-6 lg:p-7 shadow-2xl space-y-5 sticky top-28">
              <h3 className="text-lg font-bold text-white pb-3 border-b border-white/10">
                Đơn hàng ({cart.length} sản phẩm)
              </h3>

              {/* Cart Items Summary */}
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={item.maSP} className="flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img
                        src={item.hinhAnh}
                        alt={item.tenSP}
                        className="w-10 h-10 object-contain p-1 rounded-lg bg-black/30 border border-white/5"
                      />
                      <div className="truncate">
                        <div className="text-white font-medium truncate">{item.tenSP}</div>
                        <div className="text-slate-400">SL: x{item.soLuong}</div>
                      </div>
                    </div>
                    <span className="text-amber-400 font-bold whitespace-nowrap">
                      {formatPrice(item.giaBan * item.soLuong)} ₫
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-white/10 space-y-2 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Tạm tính:</span>
                  <span className="text-white font-semibold">{formatPrice(totalPrice)} ₫</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Vận chuyển toàn quốc:</span>
                  <span className="text-emerald-400 font-semibold">0 ₫ (Miễn phí)</span>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex justify-between items-baseline">
                <span className="text-sm font-bold text-white">Tổng thanh toán:</span>
                <span className="text-2xl font-extrabold text-amber-400">
                  {formatPrice(totalPrice)} ₫
                </span>
              </div>

              <button
                type="submit"
                disabled={formik.isSubmitting}
                className="w-full py-4 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-sm shadow-xl shadow-amber-500/25 transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {formik.isSubmitting ? (
                  <>
                    <span className="animate-spin">⏳</span>
                    <span>Đang xử lý đơn hàng...</span>
                  </>
                ) : (
                  <>
                    <span>✓</span>
                    <span>Xác nhận & Hoàn tất đặt hàng</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
