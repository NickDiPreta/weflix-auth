import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav from "./shared/Nav";
import { BrowserRouter, Redirect, Switch, Route, Link } from "react-router-dom";
import Recommendation from "./shared/recommendation-form";
import styled from "styled-components"

const SmallMovie = (props) => {
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
  const [year, setYear] = useState("2000")
  axios
    .get(
      `https://api.themoviedb.org/3/search/movie?api_key=0484cc139341c36f9dce3ac32f0bd803&language=en-US&query=${props.title}&page=1&include_adult=false`
    )
    .then((response) => {
        console.log('tmbd hit', response.data)
      console.log(response.data.results[0].poster_path);
      setCover(
        `http://image.tmdb.org/t/p/w200/${response.data.results[0].poster_path}`
      );
      let yr = response.data.results[0].release_date
      let splitted = yr.split("-")
      
      setYear(splitted[0])
    });


    const handleMovieClick = (title) => {
        
    }

  return (
    <Hover onClick={()=>handleMovieClick(props.title)} className="poster">
      <img src={cover} alt="movie cover" height="150px"/>
      <p>{props.title}
      <br />
      {year}</p>
      
    </Hover>
  );
};

export default SmallMovie;
