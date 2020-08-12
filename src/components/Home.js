import React, { useState } from "react";
import Registration from "./auth/Registration";
import Login from "./auth/Login"

const Home = (props) => {
  const handleSuccessfulAuth = (data) => {
    props.handleLogin(data)
    props.history.push("/dashboard");
  };

  return (
    <div>
      <h1>Home</h1>
      <h1>Status: {props.loggedInStatus}</h1>
      <Registration handleSuccessfulAuth={handleSuccessfulAuth} />
      <Login handleSuccessfulAuth={handleSuccessfulAuth} />
    </div>
  );
};

export default Home;
