import { useState } from "react";

export default function ExampleLogin() {
  console.log("ExampleLogin");

  const [isLogin, setIsLogin] = useState(false); // => false

  const handlLogin = () => {
    setIsLogin(true);
  };

  const handlLogout = () => {
    setIsLogin(false);
  };

  const renderLogin = () => {
    return (
      <div>
        <h1>Vui long dang nhap</h1>
        <button
          onClick={handlLogin}
          type="button"
          className="text-white bg-success box-border border border-transparent hover:bg-success-strong focus:ring-4 focus:ring-success-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
        >
          Login
        </button>
      </div>
    );
  };

  const renderLogout = () => {
    return (
      <div>
        <h1>Hello User</h1>
        <button
          onClick={handlLogout}
          type="button"
          className="text-white bg-danger box-border border border-transparent hover:bg-danger-strong focus:ring-4 focus:ring-danger-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
        >
          Lgout
        </button>
      </div>
    );
  };

  return (
    <div>
      <h1>ExampleLogin</h1>
      {isLogin ? renderLogout() : renderLogin()}
    </div>
  );
}
