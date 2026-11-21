export default function RenderingElement() {
  const username = "Nguyen";
  const titile = "Noi tinh yeu bat dau";
  const description = "Lorem.......";

  const renderSong = () => {
    return (
      <div>
        <h1>Tên bài hát: {titile}</h1>
        <p>Lời bài hát: {description}</p>
      </div>
    );
  };

  return (
    <div>
      <h1>RenderingElement</h1>
      <div>{username}</div>
      {renderSong()}
    </div>
  );
}
