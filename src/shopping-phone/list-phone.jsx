import Phone from "./phone";

export default function ListPhone(props) {
  const { listPhone, onDetailPhone, onAddToCart, selectedPhoneId } = props;

  if (!listPhone || listPhone.length === 0) {
    return (
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
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {listPhone.map((phone) => (
        <Phone
          key={phone.maSP}
          phone={phone}
          onDetailPhone={onDetailPhone}
          onAddToCart={onAddToCart}
          isSelected={selectedPhoneId === phone.maSP}
        />
      ))}
    </div>
  );
}
