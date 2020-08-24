import React, { useState, useEffect } from "react";

const About = () => {
    return (<div className="about">
        <h2>About WEFLIX</h2>
        <h3>WeFlix is an app designed to help groups of people settle on a movie to watch together.</h3> 
        <p>WeFlix's recommender system is a user-user collaborative recommender system. User-user systems try to identify "nearest neighbors" of users to generate personalized recommendations. Because of this structuring, although WeFlix suffers from a "cold start" weakness, as more and more users sign in and add movies to their "My Movies" section, the recommender system becomes more powerful! </p><br />
        <p>Check out my medium article about my implementation here!</p>
        </div>)
}

export default About