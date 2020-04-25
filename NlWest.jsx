import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

function NlWest(props) {
  return (
    <a href="google.com">
      <img type="image" href="google.com" src={props.img} className="NlWest" />
    </a>
  );
}

export default NlWest;
