import React from 'react';
// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

const AboutPage = () => (
  <div>
    <div>
      <p>
        Outdoor Planner is a web application that helps you plan your next outdoor adventure. 
        Outdoor Planner allows registered users to be able to view a map of the area they want to explore via the map functionality. 
        Users can plot their intended course on the map, and also make notes on their intended course and the area itself. 
        Users do this so the next time they are planning on enjoying the great outdoors, 
        they have an application where they can leave notes about highlights and concerns.
      </p>
    </div>
  </div>
);

export default AboutPage;