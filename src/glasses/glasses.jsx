export default function Glasses(props) {
  return (
    <img
      onClick={() => props.onHandleChangeGlass(props.glassProps)}
      src={props.glassProps.url}
      alt={props.glassProps.name}
      className="h-14 cursor-pointer border border-gray-300 p-1"
    />
  );
}
