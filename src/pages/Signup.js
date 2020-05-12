import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { signup } from "../helpers/auth";

import { ROUTES } from "../constants";

function SignUp() {
  const history = useHistory();
  // component state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(email, password);
      history.push(ROUTES.HOME);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <h1>
          Sign Up to
          <Link to={ROUTES.HOME}>Chatty</Link>
        </h1>
        <p>Fill in the form below to create an account.</p>
        <div>
          <input
            placeholder="Email"
            name="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          ></input>
        </div>
        <div>
          <input
            placeholder="Password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
          ></input>
        </div>
        <div>
          {error}
          <button type="submit">Sign up</button>
        </div>
        <hr></hr>
        <p>
          Already have an account? <Link to={ROUTES.LOGIN}>Login</Link>
        </p>
      </form>
    </div>
  );
}

export default SignUp;
