export default function Glasses(props) {
  const { glassProps, onHandleChangeGlass, isSelected } = props;
  return (
    <div
      onClick={() => onHandleChangeGlass(glassProps)}
      className={`h-16 w-28 p-2 rounded-[4px] cursor-pointer transition-all duration-200 flex items-center justify-center ${
        isSelected
          ? "bg-[#3D2517] border-2 border-[#CA8A04] quest-glow-active"
          : "bg-[#1A0F0A] border border-[#5C3D2E] hover:border-[#CA8A04]/60 hover:bg-[#3D2517] quest-glow-sm hover:quest-glow"
      }`}
    >
      <img
        src={glassProps.url}
        alt={glassProps.name}
        className="max-h-full max-w-full object-contain filter drop-shadow"
      />
    </div>
  );
}
