import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav from "./shared/Nav";
import { BrowserRouter, Redirect, Switch, Route, Link } from "react-router-dom";
import Recommendation from "./shared/recommendation-form";
import Movie from "./Movie";
import styled from "styled-components";

const GroupRec = (props) => {
  const [recs, setRecs] = useState([]);
  const [group, setGroup] = useState([])
  const [friend, setFriend] = useState('')
  const newLink = `http://localhost:3002/users/${props.id}`;

 


  useEffect(() => {
    const checkRecs = async () => {
      await axios
        .get(newLink)
        .then((response) => {
          console.log(response);
          setRecs(response.data[0].ratings);
        })
        .catch((error) => {
          console.log("recommendation -", error);
        });
    };
    checkRecs();
  }, [newLink]);

  

//   const addFriend = (event) => {
//       console.log('friend added')
//       let cp = [...group]
//       cp.push('new')
//     setGroup(cp)
//   };
//   wholeGroup = group.map((e) => <li>{e}</li>);

  return (
    <div>
      Group Recommendations
      
    </div>
  );
};


