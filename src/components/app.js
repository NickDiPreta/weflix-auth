import React, { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Dashboard from "./Dashboard";

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
  
  return (
    <div className="app">
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path={"/"}
            render={(props) => (
              <Home {...props} handleLogin ={handleLogin} loggedInStatus={currentUser.loggedInStatus}  />
            )}
          />

          <Route
            exact
            path={"/dashboard"}
            render={(props) => (
              <Dashboard
                {...props}
                currentUser={currentUser}
              />
            )}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
