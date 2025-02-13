import React from "react";
import FourOFourError from "../images/404Page.webp";

function FourOFourPage() {
  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0 }}>
      <img
        src={FourOFourError}
        alt="404 Error"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </div>
  );
}

export default FourOFourPage;
