import React from "react";
import styled from "styled-components";
import Nav from "./shared/Nav";
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
  Link,
} from "react-router-dom";

const Dashboard = (props) => {
  const Hover = styled.li`
    padding: 10px;
    border-radius: 3px;
    :hover {
      cursor: pointer;
      background-color: rgba(185, 29, 58, 0.5);
      transition-duration: 0.3s;
    }
  `;
  return (
    <div>
      <div>
        {/* <h1>Dashboard</h1>
        <h1>Status: {props.currentUser.loggedInStatus}</h1> */}
        <div className="choose-profile">
          <h2>Who's watching?</h2>
          <ul className="profile-list">
            <Link to="/recommendation-form">
              <Hover className="dash-select">
                {" "}
                <img src="https://i.imgur.com/ICYksS4.png" />
                <br />
                Just Me{" "}
              </Hover>
            </Link>
            <Link to="/group-recommendation" >
            <Hover className="dash-select">
              {" "}
              <img src="https://i.imgur.com/DsGAB1V.png" />
              <br />A Group
            </Hover>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
