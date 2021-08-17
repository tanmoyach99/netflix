import React, { useRef, useState } from "react";
import "./Login.scss";

const Login = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  // const emailRef = useRef();
  // const passwordRef = useRef();

  // const handleStart = () => {
  //   setEmail(emailRef.current.value);
  // };
  // const handleSubmit = () => {
  //   setPassword(passwordRef.current.value);
  // };
  return (
    <div className="login">
      <div className="top">
        <div className="wrapper">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
            alt=""
            className="logo"
          />
        </div>
      </div>
      <div className="container">
        <form>
          <h1>Sign in</h1>
          <input type="email" name="email" placeholder="Email" id="" />
          <input type="password" name="" id="" placeholder="Password" />
          <button className="loginButton">Sign In</button>
          <span>
            New to NetFlix ?<b>Sign up</b>{" "}
          </span>
          <small>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti,
            sapiente.
          </small>
        </form>
      </div>
    </div>
  );
};

export default Login;
