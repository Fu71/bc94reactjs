import Phone from "./phone";

export default function ListPhone(props) {
  const { listPhone, onDetailPhone, onAddToCart, selectedPhoneId } = props;

  if (!listPhone || listPhone.length === 0) {
    return (
      <div className="rounded-[4px] border border-[#5C3D2E] bg-[#2C1A10] p-12 text-center my-8">
        <div className="mx-auto w-12 h-12 mb-3 text-[#CA8A04] flex items-center justify-center border border-[#CA8A04]/40 rounded-full">
          📜
        </div>
        <h3 className="font-cinzel text-lg font-bold text-[#F5E6D3]">
          No Relics Found in Vault
        </h3>
        <p className="font-spectral text-sm text-[#BFA98A] mt-1">
          Try adjusting your search criteria or rarity filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
