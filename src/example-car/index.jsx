import { useState } from "react";

export default function ExampleCar() {
  const [url, setUrl] = useState("./images/red-car.jpg");

  //   const handleRed = () => {
  //     setUrl("./images/red-car.jpg");
  //   };

  //   const handleBlack = () => {
  //     setUrl("./images/black-car.jpg");
  //   };

  //   const handleSilver = () => {
  //     setUrl("./images/silver-car.jpg");
  //   };

  const handleChangeUrl = (url) => {
    setUrl(url);
  };

  return (
    <div>
      <h1>ExampleCar</h1>
      <div className="grid grid-cols-2">
        <div>
          <img src={url} alt="" />
        </div>
        <div>
          <button
            onClick={() => handleChangeUrl("./images/red-car.jpg")}
            className="text-white bg-danger box-border px-4 py-2.5"
          >
            Red
          </button>
          <button
            onClick={() => handleChangeUrl("./images/black-car.jpg")}
            className="text-white bg-dark box-border px-4 py-2.5"
          >
            Black
          </button>
          <button
            onClick={() => handleChangeUrl("./images/silver-car.jpg")}
            className="text-black bg-neutral-secondary-medium box-border px-4 py-2.5"
          >
            Silver
          </button>
        </div>
      </div>
    </div>
  );
}
