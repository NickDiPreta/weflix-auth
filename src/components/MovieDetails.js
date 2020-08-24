import React, { useState, useEffect } from "react";
import axios from "axios";


const MovieDetails = (props) => {

  const [cover, setCover] = useState("");
  const [info, setInfo] = useState({});
  
  axios
    .get(
      `https://api.themoviedb.org/3/search/movie?api_key=0484cc139341c36f9dce3ac32f0bd803&language=en-US&query=${props.match.params.title}&page=1&include_adult=false`
    )
    .then((response) => {
      setInfo(response.data.results[0]);
      setCover(
        `http://image.tmdb.org/t/p/w200/${response.data.results[0].poster_path}`
      );
    });

  return (
    <div className="movie-details">
      <div className="poster">
        <img src={cover} alt="movie cover" />
        <p>{props.match.params.title}</p>
        <p>Release Date: {info.release_date}</p>
        <p id="Movie-Description">Description: {info.overview}</p>
      </div>
    </div>
  );
};

export default MovieDetails;
