import React, { useState, useEffect } from "react";
import Home from "./Home";
import Dashboard from "./Dashboard";
import axios from "axios";
import Nav from "./shared/Nav";
import {
  BrowserRouter,
  Redirect,
  Switch,
  Route,
  Link,
  withRouter,
} from "react-router-dom";
import Singlerec from "./Singlerec";
import Grouprec from "./Grouprec";

const App = () => {
  const [userMovies, setUserMovies] = useState([]);
  const [id, setId] = useState(0);
  const [currentUser, setCurrentUser] = useState({
    loggedInStatus: "NOT LOGGED IN",
    user: {},
  });

  const handleLogin = (data) => {
    setCurrentUser({
      loggedInStatus: "LOGGED_IN",
      user: data.user,
    });
    setId(data.user.id)
  };

  const handleLogout = () => {
    setCurrentUser({ user: {}, loggedInStatus: "NOT LOGGED IN" });
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      await axios
        .get("https://www.weflix.org/logged_in", { withCredentials: true })
        .then((response) => {
          if (
            response.data.logged_in &&
            currentUser.loggedInStatus === "NOT LOGGED IN"
          ) {
            setCurrentUser({
              ...response.data.user,
              loggedInStatus: "LOGGED_IN",
            });
            setId(response.data.user.id);
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
      <Nav logout={handleLogout} currentUser={currentUser} />

      <Switch>
        <Route
          exact
          path="/dashboard"
          render={(props) => (
            <Dashboard {...props} currentUser={currentUser} l />
          )}
        />
        <Route
          exact
          path={"/recommendation-form"}
          render={(props) => (
            <Singlerec
              id={id}
              userMovies={userMovies}
              currentUser={currentUser}
              loggedInStatus={currentUser.loggedInStatus}
            />
          )}
        />
        <Route
          exact
          path={"/group-recommendation"}
          render={(props) => (
            <Grouprec
              myMovies={myMovies}
              currentUser={currentUser}
              id={currentUser}
            />
          )}
        />
        <Route
          exact
          path="/"
          render={(props) => (
            <Home
              {...props}
              handleLogin={handleLogin}
              handleLogout={handleLogout}
              loggedInStatus={currentUser.loggedInStatus}
              currentUser={currentUser}
            />
          )}
        />
      </Switch>
    </div>
  );
};

export default App;
