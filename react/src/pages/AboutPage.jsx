import React from "react";
import { useSelector } from "react-redux"; // Import useSelector to access Redux state

const AboutPage = () => {
  const name = useSelector((state) => state.data.name); // Access the name from Redux store

  return (
    <div>
      <h1>About Page</h1>
      {name ? <p>Your name is: {name}</p> : <p>No name provided.</p>}
    </div>
  );
};

export default AboutPage;
