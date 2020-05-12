import React, { useState } from "react";
import { Link } from "react-router-dom";

import { signin, signInWithGoogle } from "../helpers/auth";

import { ROUTES } from "../constants";

function Login() {
  //   component state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setErrorMessasge] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessasge("");
    try {
      await signin(email, password);
      console.log("login sucess!");
    } catch (error) {
      setErrorMessasge(error.message);
    }
  };

  const googleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      setErrorMessasge(error.message);
    }
  };

  return (
    <div>
      <form autoComplete="off" onSubmit={(e) => handleSubmit(e)}>
        <h1>
          Login to
          <Link to={ROUTES.HOME}>Chatty</Link>
        </h1>
        <p>Fill in the form below to login to your account.</p>
        <div>
          <input
            placeholder="Email"
            name="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div>
          <input
            placeholder="Password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
          />
        </div>
        <div>
          {error ? <p>{error}</p> : null}
          <button type="submit">Login</button>
        </div>
        <hr />
        <p>Or</p>
        <button onClick={() => googleSignIn()} type="button">
          Login with Google
        </button>
        <hr />
        <p>
          Don't have an account? <Link to={ROUTES.SIGNUP}>Sign up</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
