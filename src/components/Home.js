import React, { useState } from "react";
import Registration from "./auth/Registration";
import Login from "./auth/Login";
import axios from "axios";

const Home = (props) => {
  const handleSuccessfulAuth = (data) => {
    props.handleLogin(data);
    props.history.push("/dashboard");
  };

  const handleLogoutClick = () => {
    axios
      .delete("http://localhost:3001/logout", { withCredentials: true })
      .then(props.handleLogout())
      .catch((error) => {
        console.log("logout error", error);
      });
  };

  return (
    <div>
      <h1>Home</h1>
      <h1>Status: {props.loggedInStatus}</h1>
      <Registration handleSuccessfulAuth={handleSuccessfulAuth} />
      <Login handleSuccessfulAuth={handleSuccessfulAuth} />
      <button onClick={() => handleLogoutClick()}>Log Out</button>
    </div>
  );
};

export default Home;
