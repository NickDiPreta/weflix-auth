import React, { useState } from "react";
import axios from "axios";

export default function Registration(props) {
  const [registration, setRegistration] = useState({
    email: "",
    password: "",
    password_confirmation: "",
    registrationErrors: "",
  });

  const handleSubmit = (event) => {
    axios
      .post(
        "https://www.weflix.org/registrations",
        {
          user: {
            email: registration.email,
            password: registration.password,
            password_confirmation: registration.password_confirmation,
            registrationErrors: registration.registrationErrors,
          },
        },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.data.status === "created") {
          props.handleSuccessfulAuth(response.data);
        }
      })
      .catch((error) => {
        console.log("registration error", error);
      });

    event.preventDefault();

    setRegistration({
      email: "",
      password: "",
      password_confirmation: "",
      registrationErrors: "",
    });
    console.log("Registration form submitted.");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={registration.email}
          onChange={(e) =>
            setRegistration({ ...registration, email: e.target.value })
          }
          required
        ></input>
        <br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={registration.password}
          onChange={(e) =>
            setRegistration({ ...registration, password: e.target.value })
          }
          required
        ></input>
        <br />
        <input
          type="password"
          name="password_confirmation"
          placeholder="Confirm Password"
          value={registration.password_confirmation}
          onChange={(e) =>
            setRegistration({
              ...registration,
              password_confirmation: e.target.value,
            })
          }
          required
        ></input>
        <br />
        <button type="Submit">Register</button>
      </form>
    </div>
  );
}
