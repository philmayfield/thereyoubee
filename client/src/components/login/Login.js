import React from "react";
import RegLogin from "../regLogin/RegLogin";

const Login = () => {
  return (
    <div className="login-view">
      <RegLogin isRegister={false} />
    </div>
  );
};

export default Login;
