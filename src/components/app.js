import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Dashboard from "./Dashboard";
import axios from "axios";

const App = () => {
  const [currentUser, setCurrentUser] = useState({
    loggedInStatus: "NOT LOGGED IN",
    user: {},
  });

  const handleLogin = (data) => {
    setCurrentUser({
      loggedInStatus: "LOGGED_IN",
      user: data.user,
    });
  };

  const handleLogout = () => {
    setCurrentUser({ user: {}, loggedInStatus: "NOT LOGGED IN" });
  };

  

  useEffect(() => {
    const checkLoginStatus = async () => {
      await axios
        .get("http://localhost:3001/logged_in", { withCredentials: true })
        .then((response) => {
          if (
            response.data.logged_in &&
            currentUser.loggedInStatus === "NOT LOGGED IN"
          ) {
            setCurrentUser({
              ...response.data.user,
              loggedInStatus: "LOGGED_IN",
            });
            console.log("Logged in? ", response);
          } else if (
            response.data.logged_in &
            (currentUser.loggedInStatus === "NOT LOGGED IN")
          )
            setCurrentUser({ user: {}, loggedInStatus: "NOT_LOGGED_IN" });
        })
        .catch((error) => {
          console.log("Check login error -", error);
        });
    };
    checkLoginStatus();
  }, []);

  return (
    <div className="app">
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path={"/"}
            render={(props) => (
              <Home
                {...props}
                handleLogin={handleLogin}
                handleLogout={handleLogout}
                loggedInStatus={currentUser.loggedInStatus}
              />
            )}
          />

          <Route
            exact
            path={"/dashboard"}
            render={(props) => (
              <Dashboard {...props} currentUser={currentUser} />
            )}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
