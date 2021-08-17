import React, { useRef, useState } from "react";
import "./register.scss";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailRef = useRef();
  const passwordRef = useRef();

  const handleStart = () => {
    setEmail(emailRef.current.value);
  };
  const handleSubmit = () => {
    setPassword(passwordRef.current.value);
  };
  return (
    <div className="register">
      <div className="top">
        <div className="wrapper">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
            alt=""
            className="logo"
          />
          <button className="loginButton"> signIn</button>
        </div>
      </div>
      <div className="container">
        <h1>unlimited movies,tv shows and more</h1>
        <h2>Watch anywhere, anyTime</h2>
        <p>
          ready to watch? enter the email to create or restart your membership
        </p>
        {!email ? (
          <div className="input">
            <input
              ref={emailRef}
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
            />
            <button onClick={handleStart} className="btn registerButton">
              get started
            </button>
          </div>
        ) : (
          <form className="input">
            <input
              ref={passwordRef}
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
            />
            <button onClick={handleSubmit} className="btn registerButton">
              start membership
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Register;
