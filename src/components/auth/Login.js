import React, { useState } from "react";
import axios from "axios";

export default function Login(props) {
  const [session, setSession] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = (event) => {
    axios
      .post(
        "http://localhost:3001/sessions",
        {
          user: {
            email: session.email,
            password: session.password,
            loginErrors: "",
          },
        },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.data.logged_in === true) {
          props.handleSuccessfulAuth(response.data);
        }
        console.log('res from login', response)
      })
      .catch((error) => {
        console.log("login error", error);
      });

    event.preventDefault();
    console.log("login form submitted.");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={session.email}
          onChange={(e) =>
            setSession({ ...session, email: e.target.value })
          }
          required
        ></input>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={session.password}
          onChange={(e) =>
            setSession({ ...session, password: e.target.value })
          }
          required
        ></input>
        <button type="Submit">Login</button>
      </form>
    </div>
  );
}
