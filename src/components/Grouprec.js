import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav from "./shared/Nav";
import { BrowserRouter, Redirect, Switch, Route, Link } from "react-router-dom";
import Recommendation from "./shared/recommendation-form";
import Movie from "./Movie";
import styled from "styled-components";

const GroupRec = (props) => {
  const [allUsers, setAllUsers] = useState([]);
  const [name, setName] = useState('');
  const [group, setGroup] = useState([]);
  const [recs, setRecs] = useState([]);
  const [display, setDisplay] = useState({})
  const [gName, setgName] = useState('')
  const [films, setFilms] = useState([])
  const newLink = `https://fast-anchorage-26197.herokuapp.com/users/${props.id}`;
  const allU = `https://fast-anchorage-26197.herokuapp.com/users`;
  const GrnBtn = styled.button`
  :hover {
    background-color: #ce3434;
    transition-duration: 0.3s;
    cursor: pointer;
  }
`;


useEffect(()=>{
  const updateMovies = async()=>{
    await axios.get("https://www.weflix.org/movies").then((response)=>{
      setFilms(response.data.movies.filter((e)=>e.user_id == props.id))
    })
  }
  updateMovies()
},[props.id])


  useEffect(() => {
    const getUsers = async () => {
      await axios.get("https://fast-anchorage-26197.herokuapp.com/users").then((response) => {
        setAllUsers(response.data);
        console.log("response is ", response);
      });
    };
    getUsers();
  }, []);

    const addFriend = (n) => {
        console.log('friend added')
        let cp = [...group]
        cp.push(n)
      setGroup(cp)
    };

  const submitU = () => {
    event.preventDefault();
    console.log("submitted",name);
    addFriend(name)
    getRec(name)
  };

  const wholeGroup = allUsers.map((e) => (
    <option value={e.name}>{e.name}</option>
  ));

  const showGroup = group.map(e=><li>{e}</li>)

  const getRec = (name) =>{
    const someObject = allUsers.find(item => item.name == name);
    console.log(someObject)
    axios.get(`https://fast-anchorage-26197.herokuapp.com/users/${someObject.id}`).then((response)=>{
      const allRecs = [...recs]
      allRecs.push(response.data[0].ratings)
      setRecs(allRecs)
      // updateStorage()
    })
  }
  
  
const updateStorage = () => {
  let storage = {}
  let myNew = recs.flat()
  myNew.map(e=>{
    storage[e.name] ? storage[e.name] += e.rating :storage[e.name] = e.rating}
    
)
console.log(storage)
const keysSorted = Object.keys(storage).sort(function(a,b){return storage[b]-storage[a]})
setgName(keysSorted[0])
// setDisplay(keysSorted)
// console.log(display)
// console.log(Object.values(display)[0])
// setgName(Object.values(display)[0])



}





  return (
    <div className="group-rec">
      Group Recommendations
      <br />
      My Movies: {films.length>0? films[0].title: ""}
      <form onSubmit={(e) => submitU(e)}>
        <label for="user">Choose a user:</label>
        <select id="user" name="user" onChange={(e)=>setName(e.target.value)}>
          {wholeGroup}
        </select>
        <input type="submit" />
      </form>
      {showGroup}
      {Object.values(display)[0]}
      <GrnBtn className="greenboy" onClick={updateStorage}>Get A Recommendation For Your Group!</GrnBtn>
      {gName !=''? <Movie title={gName}/> : ""}
    </div>
  );
};

export default GroupRec;
