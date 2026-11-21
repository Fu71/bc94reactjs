import { Link } from "react-router-dom";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export default function NotFoundPage() {
  useDocumentTitle("404 - Không tìm thấy trang");

  return (
    <div className="container mx-auto px-4 py-24 text-center">
      <div className="max-w-md mx-auto rounded-3xl border border-white/10 bg-[#160E0A] p-10 shadow-2xl space-y-4">
        <div className="text-6xl font-extrabold text-amber-500 font-brand">404</div>
        <h1 className="text-2xl font-bold text-white">Trang không tồn tại</h1>
        <p className="text-sm text-slate-400">
          Đường dẫn bạn vừa truy cập không tồn tại hoặc đã được thay đổi.
        </p>
        <div className="pt-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 py-3 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm shadow-lg shadow-amber-500/25 transition-all"
          >
            ← Quay về trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
}
