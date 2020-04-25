import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import rockies from "./Rockies.png";
import padres from "./Padres.jpg";
import $ from "jquery";
import { isPropertySignature } from "typescript";

function Games(props) {
  return (
    <div
      id="myCarousel"
      className="carousel slide carousel-fade"
      data-ride="carousel"
    >
      <ol className="carousel-indicators">
        <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
        <li data-target="#myCarousel" data-slide-to="1"></li>
        <li data-target="#myCarousel" data-slide-to="2"></li>
      </ol>

      <div className="carousel-inner">
        <div className="item active">
          <img src={rockies} alt="Breakfast" id="team" />

          <button
            type="button"
            className="btn btn-dark btn-sm"
            href="#modal fade"
            id="mealplanButton"
          >
            <h3>
              <b>
                {props.Hometeam}+@{props.Awayteam}
              </b>
            </h3>
          </button>
          <div className="carousel-caption">
            <button
              type="button"
              className="btn btn-dark"
              data-toggle="modal"
              data-target="#breakfastModal"
              id="seeRecipes"
            >
              Acai Bowl
            </button>
          </div>
        </div>
        <div className="item"></div>
            <div
        {/* <div class="item">
          <img src="rockies.png" alt="Lunch" />
          <button
            type="button"
            class="btn btn-dark"
            href="#modal fade"
            id="mealplanButton"
            data-toggle="modal"
            data-target="#exampleModalLong"
          >
            <h3>
              <b>Lunch</b>
            </h3>
          </button>
          <div class="carousel-caption">
            <button
              type="button"
              class="btn btn-dark"
              data-toggle="modal"
              data-target="#lunchModal"
              id="seeRecipes"
            >
              Club Sandwhich
            </button>
          </div>
        </div> */}
        <div class="item">
          <img src={rockies} alt="Dinner" />
          <button
            type="button"
            class="btn btn-dark"
            href="#modal fade"
            id="mealplanButton"
            data-toggle="modal"
            data-target="#exampleModalLong"
          >
            <h3>
              <b>Dinner</b>
            </h3>
          </button>
          <div class="carousel-caption">
            <button
              type="button"
              class="btn btn-dark"
              data-toggle="modal"
              data-target="#dinnerModal"
              id="seeRecipes"
            >
              Shrimp Scampi
            </button>
          </div>
        </div>
      </div>
      <a class="left carousel-control" href="#myCarousel" data-slide="prev">
        <span class="glyphicon glyphicon-chevron-left"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="right carousel-control" href="#myCarousel" data-slide="next">
        <span class="glyphicon glyphicon-chevron-right"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
  );
}

export default Games;
