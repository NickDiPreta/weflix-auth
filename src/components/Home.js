import React, { useState } from "react";
import Registration from "./auth/Registration";
import Login from "./auth/Login";
import axios from "axios";
import Nav from "./shared/Nav"

const Home = (props) => {
  const handleSuccessfulAuth = (data) => {
    props.handleLogin(data);
    props.history.push("/dashboard");
  };

  const handleLogoutClick = () => {
    axios
      .delete("https://www.weflix.org/logout", { withCredentials: true })
      .then(props.handleLogout())
      .catch((error) => {
        console.log("logout error", error);
      });
  };

  props.currentUser.loggedInStatus === "LOGGED_IN" ? props.history.push("/dashboard"): ""
  return (
    <div className="homepage-mid">
      
      <h1>Welcome</h1>
      {/* <h1>Status: {props.loggedInStatus}</h1> */}
      <h2>Log In</h2>
      <Login handleSuccessfulAuth={handleSuccessfulAuth} />
      <h2>Register</h2>
      <Registration handleSuccessfulAuth={handleSuccessfulAuth} />
 
      {/* <button onClick={() => handleLogoutClick()}>Log Out</button> */}
    </div>
  );
};

export default Home;
