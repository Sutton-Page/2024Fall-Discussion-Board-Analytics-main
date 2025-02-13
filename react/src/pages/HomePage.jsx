import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import GeorgiaSouthernLogo from "/Georgia-Southern-Eagles-Logo-1999.png";

function HomePage() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8888/student")
      .then((response) => response.text()) // Change to text to match the returned HTML
      .then((data) => {
        // Parse the HTML string to extract student names
        const parser = new DOMParser();
        const doc = parser.parseFromString(data, "text/html");
        const names = Array.from(doc.querySelectorAll("h2")).map(
          (h2) => h2.textContent
        );
        setStudents(names);
      });
  }, []);

  return (
    <div>
      <div className="image-container">
        <img
          src={GeorgiaSouthernLogo}
          alt="Georgia Southern Eagles Logo"
          style={{
            width: "100%",
            height: "auto",
            maxWidth: "854px",
            display: "block",
            margin: "0 auto",
          }}
        />
      </div>
    </div>
  );
}

export default HomePage;
