import ChildComponent from "./child";
import { useState } from "react";

export default function Communication() {
  const [username, setUsername] = useState("Cybersoft");
  const [age, setAge] = useState(18);

  const handleChangeUsernane = () => {
    setUsername("Nguyen");
  };

  /**
   * Hàm này sẽ truyền vào component con để nhận dữ liệu
   */
  const onHandleResetUsername = (data) => {
    setUsername(data);
  };

  return (
    <div>
      <h1>Communication</h1>
      <p>Username: {username}</p>
      <button
        onClick={handleChangeUsernane}
        className="text-white bg-blue-500 box-border px-4 py-2.5"
      >
        Change Username
      </button>
      <p>Age: {age}</p>

      <hr />

      <ChildComponent
        username={username}
        age={age}
        onHandleResetUsername={onHandleResetUsername}
      />
    </div>
  );
}
