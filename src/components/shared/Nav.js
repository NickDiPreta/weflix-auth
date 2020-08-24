import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import axios from "axios"
import Popup from "./Popup"

const Nav = (props) => {
  const [popup, setPopup] = useState(false)

  const handleLogoutClick = () => {
    axios
      .delete("https://www.weflix.org/logout", { withCredentials: true })
      .then(props.logout())
      .catch((error) => {
        console.log("logout error", error);
      });
      
  };

  const showPop = () => {
    setPopup(!popup)
  }

  return (
    <nav>
      <div className="nav-left">
        <Link to="/dashboard">
          <img id="logo" src="https://i.imgur.com/00kPM8G.png" alt="logo" />
        </Link>
        <h3>{props.currentUser.email}</h3>
      </div>
      <div className="nav-right">
        <Link to="/about"><img id="avatar" alt="avatar" src="https://i.imgur.com/wi5ci6B.png" /></Link>
        <button onClick={() => handleLogoutClick()}>Logout</button>

      </div>
    </nav>
  );
};

export default Nav;
