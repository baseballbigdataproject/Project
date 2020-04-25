import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

function NlEast(props) {
  return (
    <a>
      <input
        type="image"
        href="google.com"
        src={props.img}
        className="NLWest"
      />
    </a>
  );
}

export default NlEast;
