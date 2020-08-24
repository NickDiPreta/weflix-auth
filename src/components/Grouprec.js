import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav from "./shared/Nav";
import { BrowserRouter, Redirect, Switch, Route, Link } from "react-router-dom";
import Recommendation from "./shared/recommendation-form";
import Movie from "./Movie";
import styled from "styled-components";

const GroupRec = (props) => {
  const [allUsers, setAllUsers] = useState([]);
  const [name, setName] = useState("");
  const [group, setGroup] = useState([]);
  const [recs, setRecs] = useState([]);
  const [display, setDisplay] = useState({});
  const [gName, setgName] = useState("");
  const [gName2, setgName2] = useState("");
  const [films, setFilms] = useState([]);
  const [allG, setAllG] = useState([]);
  const newLink = `https://fast-anchorage-26197.herokuapp.com/users/${props.id}`;
  const allU = `https://fast-anchorage-26197.herokuapp.com/users`;
  const GrnBtn = styled.button`
  margin:10px;
    :hover {
      background-color: #ce3434;
      transition-duration: 0.3s;
      cursor: pointer;
    }
  `;

  useEffect(() => {
    const updateMovies = async () => {
      await axios.get("https://www.weflix.org/movies").then((response) => {
        setFilms(response.data.movies.filter((e) => e.user_id == props.id));
      });
    };
    updateMovies();
  }, [props.id]);

  useEffect(() => {
    const getUsers = async () => {
      await axios
        .get("https://fast-anchorage-26197.herokuapp.com/users")
        .then((response) => {
          setAllUsers(response.data);
          console.log("response is ", response);
        });
    };
    getUsers();
  }, []);

  const addFriend = (n) => {
    console.log("friend added");
    let cp = [...group];
    cp.push(n);
    setGroup(cp);
  };

  const submitU = () => {
    event.preventDefault();
    console.log("submitted", name);
    addFriend(name);
    getRec(name);
  };

  const wholeGroup = allUsers.map((e) => (
    <option value={e.name}>{e.name}</option>
  ));

  const showGroup = group.map((e) => <li>{e}</li>);

  const getRec = (name) => {
    const someObject = allUsers.find((item) => item.name == name);
    console.log(someObject);
    axios
      .get(`https://fast-anchorage-26197.herokuapp.com/users/${someObject.id}`)
      .then((response) => {
        const allRecs = [...recs];
        allRecs.push(response.data[0].ratings);
        setRecs(allRecs);
        // updateStorage()
      });
  };

  const updateStorage = () => {
    let storage = {};
    let myNew = recs.flat();
    myNew.map((e) => {
      storage[e.name]
        ? (storage[e.name] += e.rating)
        : (storage[e.name] = e.rating);
    });
    console.log(storage);
    const keysSorted = Object.keys(storage).sort(function (a, b) {
      return storage[b] - storage[a];
    });
    setgName(keysSorted[0]);
    setgName2(keysSorted[1]);
    const holder = [];
    holder.push(keysSorted[0]);
    holder.push(keysSorted[1]);
    holder.push(keysSorted[2]);
    holder.push(keysSorted[3]);
    holder.push(keysSorted[4]);
    holder.push(keysSorted[5]);
    holder.push(keysSorted[6]);
    setAllG(holder);
  };
  const showRecs = allG.map((e) => (
    <p>
      <Movie title={e} />
    </p>
  ));

  return (
    <div className="group-rec">
      <h2>Group Recommendations </h2>
      {/* My Movies: {films.length > 0 ? films[0].title : ""} */}
      <form onSubmit={(e) => submitU(e)}>
        <label for="user">
          Choose a friend: <br />
        </label>
        <select id="user" name="user" onChange={(e) => setName(e.target.value)}>
          {wholeGroup}
        </select>
        <input type="submit" />
      </form>
      {showGroup}
      {Object.values(display)[0]}
      Note: database server takes 15 seconds to load on first visit.
      <br />
      <GrnBtn className="greenboy" onClick={updateStorage}>
        Get Recommendations For Your Group!
      </GrnBtn>
      
      <ul className="movieContainer">{showRecs}
      </ul>
    </div>
  );
};

export default GroupRec;
