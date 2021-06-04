const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const routes = require("./routes");
const app = express();

//set static stuff
app.use(express.static("public"));

//enable pug
app.set("view engine", "pug");

//set template dir
app.set("views", path.join(__dirname, "./views"));

//enable bodyparser
app.use(bodyParser.urlencoded({extended: true})) //deprecated lol

//home route
app.use("/",  routes());
app.listen(3000);