/** @format */

import Model from "./model.js";
import View from "./view.js";
import Controller from "./controller.js";
import "../style.scss";
import brushIcon from "../assets/brush.svg";
import eraserIcon from "../assets/eraser.svg";
import rectangleIcon from "../assets/rectangle.svg";
import triangleIcon from "../assets/triangle.svg";
import circleIcon from "../assets/circle.svg";

var brushImg = document.getElementById("brush-img");
var eraserImg = document.getElementById("eraser-img");
var circleImg = document.getElementById("circle-img");
var rectangleImg = document.getElementById("rectangle-img");
var triangleImg = document.getElementById("triangle-img");
brushImg.src = brushIcon;
eraserImg.src = eraserIcon;
circleImg.src = circleIcon;
rectangleImg.src = rectangleIcon;
triangleImg.src = triangleIcon;

function initialize() {
  const model = new Model();
  const view = new View();
  const controller = new Controller(model, view);

  controller.init();
}

window.addEventListener("DOMContentLoaded", initialize);
