import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Search from "./Search.jsx";
import "./index.css";
import NlWest from "./NlWest";
import NlEast from "./NlEast";
import "bootstrap/dist/css/bootstrap.min.css";
import rockies from "./Rockies.png";
import padres from "./Padres.jpg";
import giants from "./Giants.png";
import dodgers from "./Dodgers.png";
import arizona from "./Arizona.png";
import Games from "./todaysGames";

function App() {
  return (
    <div>
      <Search />
      <h2 className="NLW">National League West</h2>
      <NlWest teamId="www.google.com" img={rockies} />
      <NlWest teamId="1" img={padres} />
      <NlWest teamId="1" img={giants} />
      <NlWest teamId="1" img={dodgers} />
      <NlWest teamId="1" img={arizona} />
      <Games />
    </div>
  );
}

export default App;
