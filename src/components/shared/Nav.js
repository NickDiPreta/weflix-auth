import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
  Link,
} from "react-router-dom";


const Nav = (props) => {
  return (
    <nav>
        <div className="nav-left">
     <Link to="/" ><img id="logo" src="https://i.imgur.com/00kPM8G.png" alt="logo" /></Link>
      <h3>{props.currentUser.email}</h3>
      </div>
      <div className="nav-right">
      <img id="avatar" alt="avatar" src="https://i.imgur.com/H8FXn7l.png" />
      <img id="burger" alt="menu" src="https://i.imgur.com/YGLMIUe.png" />
      </div>
    </nav>
  );
};

export default Nav;
