import logo from "../img/logo.svg";
import phil from "../img/phil.svg";
import express from "../img/express.svg";
import git from "../img/git.svg";
import heroku from "../img/heroku.svg";
import js from "../img/js.svg";
import mongo from "../img/mongo.svg";
import node from "../img/node.svg";
import react from "../img/react.svg";
import redux from "../img/redux.svg";
import sass from "../img/sass.svg";

let imgs = {
  logo,
  phil,
  express,
  git,
  heroku,
  js,
  mongo,
  node,
  react,
  redux,
  sass
};

let getImage = key => imgs[key];

export default getImage;
