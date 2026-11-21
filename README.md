# ReactJS Projects & Exercises (BC94)

Dự án thực hành và ứng dụng xây dựng trên nền tảng **ReactJS + Vite + Tailwind CSS**.

---

## 📱 1. Phone Store App (`shopping-phone`)
> **Dự án chính (Được đề xuất đưa vào CV)**

Ứng dụng xem và tương tác danh mục điện thoại thông minh:
- **Hiển thị danh sách sản phẩm:** Duyệt danh sách các mẫu điện thoại với hình ảnh, tên và mức giá.
- **Xem thông số kỹ thuật chi tiết:** Khi bấm *"Xem chi tiết"*, dữ liệu chi tiết của sản phẩm (màn hình, hệ điều hành, camera, RAM, ROM, v.v.) sẽ được hiển thị tức thì.
- **Kiến trúc kỹ thuật:**
  - Áp dụng kiến trúc chia tách Component: `ShoppingPhone` -> `ListPhone` -> `Phone` & `Detail`.
  - Luồng truyền dữ liệu hai chiều: Sử dụng **Props** truyền dữ liệu xuôi và **Lifting State Up (Callback Functions)** để truyền dữ liệu ngược từ con lên cha.

---

## 👓 2. Try Glasses App Online (`glasses`)
Ứng dụng thử kính trực tuyến theo thời gian thực:
- Giao diện trực quan cho phép người dùng click chọn các mẫu kính mắt khác nhau.
- Tự động thay đổi mẫu kính gắn lên khuôn mặt người mẫu với toạ độ căn chỉnh chuẩn (`absolute positioning`) và hiển thị thẻ thông tin mô tả chi tiết của từng kính.

---

## 🛠️ Công nghệ sử dụng
- **React 19** & **Vite** (HMR siêu nhanh)
- **Tailwind CSS** & **Flowbite**
- **JavaScript (ES6+)**
- **Component Lifecycle & Hooks** (`useState`)

---

## 🚀 Hướng dẫn chạy dự án

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
