export default function Glasses(props) {
  const { glassProps, onHandleChangeGlass, isSelected } = props;
  return (
    <div
      onClick={() => onHandleChangeGlass(glassProps)}
      className={`h-16 w-28 p-2 rounded-xl cursor-pointer transition-all duration-200 flex items-center justify-center ${
        isSelected
          ? "bg-[#251A13] border-2 border-amber-500 shadow-lg shadow-amber-500/20 -translate-y-0.5"
          : "bg-[#1C140F] border border-white/5 hover:border-amber-500/30 hover:bg-[#221812]"
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
