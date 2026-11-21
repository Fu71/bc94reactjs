# TechZone • E-Commerce Web Application (ReactJS)

> **Dự án Frontend hoàn chỉnh phục vụ Portfolio & CV.**  
> Xây dựng với **React 19**, **React Router v7**, **Formik & Yup Validation**, **Tailwind CSS** và kiến trúc **Custom Hooks + Context API**.

---

## 🌟 Điểm nổi bật & Kỹ năng kỹ thuật (Skills Showcased)

### 1. 🧭 Điều hướng Đa trang (React Router v7)
- **Cấu hình đa Route chuyên nghiệp:**
  - `/`: Trang chủ hiển thị danh mục sản phẩm, banner nổi bật, tìm kiếm và lọc thương hiệu.
  - `/product/:id`: Trang chi tiết sản phẩm độc lập (sử dụng hook `useParams` để lấy ID và render dữ liệu tương ứng).
  - `/cart`: Trang giỏ hàng quản lý sản phẩm, tăng/giảm số lượng, xóa và tính tổng tiền.
  - `/checkout`: Trang thanh toán đơn hàng với Formik & Yup.
  - `/glasses`: Trang trải nghiệm thử kính ảo trực tuyến (Virtual Try-on).
  - `*`: Trang 404 Not Found thân thiện.
- **Tối ưu trải nghiệm:** Tích hợp `NavLink` báo trạng thái active, `useNavigate` điều hướng luồng mua sắm mượt mà.

---

### 2. 📝 Quản lý & Xác thực Form (Formik + Yup)
- **Formik Integration:** Quản lý toàn bộ state form thanh toán (`values`, `errors`, `touched`, `handleChange`, `handleBlur`, `handleSubmit`, `isSubmitting`).
- **Yup Validation Schema:**
  - Kiểm tra họ tên (tối thiểu 3 ký tự, bắt buộc).
  - Kiểm tra định dạng Email chuẩn regex RFC.
  - Kiểm tra số điện thoại Việt Nam chuẩn (10 chữ số, đầu số hợp lệ 03, 05, 07, 08, 09).
  - Bắt buộc địa chỉ, phương thức thanh toán (COD, Chuyển khoản, MoMo) và đồng ý điều khoản.
- **Phản hồi lỗi thời gian thực:** Viền đỏ cảnh báo khi blur/chạm vào ô lỗi cùng thông báo chi tiết.
- **Giả lập API Submit:** Có trạng thái Loading spinner và xuất biên lai xác nhận đơn hàng (`orderId`, thời gian, thông tin giao hàng).

---

### 3. ⚡ Quản lý State & React Hooks
- **Custom Hooks tự viết:**
  - `useCart()`: Kết nối với `CartContext` để quản lý toàn bộ logic giỏ hàng (thêm, sửa số lượng, xóa, tính tổng).
  - `useDebounce(value, delay)`: Debounce ô tìm kiếm sản phẩm để tối ưu hiệu năng lọc.
  - `useDocumentTitle(title)`: Tự động đổi tiêu đề tab trình duyệt theo từng trang.
- **React Core Hooks áp dụng thực tế:**
  - `useState`: Quản lý các trạng thái cục bộ (bộ lọc, số lượng, giao diện).
  - `useEffect`: Đồng bộ giỏ hàng vào `localStorage` tự động lưu khi reload; cuộn trang mượt mà lên đầu khi đổi route.
  - `useContext`: Chia sẻ giỏ hàng toàn cục (Global State) xuyên suốt tất cả các trang mà không bị *Prop Drilling*.
  - `useMemo`: Ghi nhớ danh sách sản phẩm sau khi lọc và tổng tiền thanh toán để tránh re-render thừa.
  - `useCallback`: Tối ưu các hàm xử lý giỏ hàng (`addToCart`, `updateQuantity`, `removeFromCart`).
  - `useParams` & `useNavigate`: Điều hướng động theo tham số URL.

---

## 🚀 Hướng dẫn cài đặt & Chạy dự án

1. **Clone repository:**
   ```bash
   git clone https://github.com/Fu71/bc94reactjs.git
   cd bc94reactjs
   ```

2. **Cài đặt thư viện:**
   ```bash
   npm install
   ```

3. **Chạy môi trường phát triển (Dev Server):**
   ```bash
   npm run dev
   ```

4. **Build bản Production:**
   ```bash
   npm run build
   ```
