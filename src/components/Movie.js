import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav from "./shared/Nav";
import { BrowserRouter, Redirect, Switch, Route, Link } from "react-router-dom";
import Recommendation from "./shared/recommendation-form";
import styled from "styled-components"

const Movie = (props) => {
  const Hover = styled.div`
  margin-top: 5%;
    padding: 10px;
    border-radius: 3px;
    :hover {
      cursor: pointer;
      background-color: rgba(185, 29, 58, 0.5);
      transition-duration: 0.3s;
    }`
  const [cover, setCover] = useState("");
  axios
    .get(
      `https://api.themoviedb.org/3/search/movie?api_key=0484cc139341c36f9dce3ac32f0bd803&language=en-US&query=${props.title}&page=1&include_adult=false`
    )
    .then((response) => {
      console.log(response.data.results[0].poster_path);
      setCover(
        `http://image.tmdb.org/t/p/w200/${response.data.results[0].poster_path}`
      );
    });
  return (
    <Link to={`/movies/${props.title}`}>
    <Hover className="poster">
      <img src={cover} alt="movie cover" />
      <p>{props.title}</p>
    </Hover>
    </Link>
  );
};

export default Movie;
