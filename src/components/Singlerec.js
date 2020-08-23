import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav from "./shared/Nav";
import { BrowserRouter, Redirect, Switch, Route, Link } from "react-router-dom";
import Recommendation from "./shared/recommendation-form";
import Movie from "./Movie";

const Singlerec = (props) => {
  const [name, setName] = useState("");
  const [recs, setRecs] = useState([]);
  const [films, setFilms] = useState([])
  

  useEffect(()=>{
    const updateMovies = async()=>{
      await axios.get("https://www.weflix.org/movies").then((response)=>{
        setFilms(response.data.movies.filter((e)=>e.user_id == props.id))
      })
    }
    updateMovies()
  },[props.id])
  
 

  const url = `https://api.themoviedb.org/3/search/movie?api_key=0484cc139341c36f9dce3ac32f0bd803&language=en-US&query=${name}&page=1&include_adult=false`;

  const onSubmit = async (event) => {
    axios
      .post("https://www.weflix.org/movies", {
        user_id: props.id,
        title: name,
      })
      .then((response) => {
        console.log(response);
      });

    event.preventDefault();

    let id = 0;
    await axios.get(url).then((response) => {
      console.log(response.data.results);
      id = response.data.results[0].id;
    });
    await axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=0484cc139341c36f9dce3ac32f0bd803&language=en-US&page=1`
      )
      .then((response) => {
        console.log("response is ", response);
        setRecs(response.data.results);
      });
  };
  const handleChange = (event) => {
    setName(event.target.value);
  };

  const showRecs = recs.map((e) => (
    <p>
      <Movie title={e.original_title} />
    </p>
  ));

  const showMyMovies = films.map((e) => <Movie title={e.title} />);

  // useEffect(() => {
  //   const loadMovies = () => {
  //     window.location.reload();
  //   };
  //   loadMovies();
  // }, []);

  return (
    <div className="single-rec">
      <h2>My Movies</h2>
      <ul className="movieContainer">{showMyMovies}</ul>
      <Recommendation
        name={name}
        onSubmit={onSubmit}
        handleChange={handleChange}
      />

      <ul className="movieContainer">{showRecs}</ul>
    </div>
  );
};

export default Singlerec;
