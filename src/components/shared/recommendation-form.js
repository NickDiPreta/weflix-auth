import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter, Redirect, Switch, Route, Link } from "react-router-dom";
import styled from "styled-components"

const Recommendation = (props) => {
    const GrnBtn = styled.button`
    :hover {
      background-color: #ce3434;
      transition-duration: 0.3s;
      cursor: pointer;
    }
  `;
  
  return (
    <form className="user-form" onSubmit={props.onSubmit}>
      <input className="textboy"
        type="text"
        value={props.name}
        placeholder="Movie name here"
        onChange={props.handleChange}
        id="name"
      />
      <br />
      <GrnBtn className="greenboy"type="submit"> Search For Similar Movies </GrnBtn>
    </form>
  );
};

export default Recommendation;
