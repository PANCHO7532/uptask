const express = require("express");
const path = require("path");
const routes = require("./routes");
const app = express();

//set static stuff
app.use(express.static("public"));

//enable pug
app.set("view engine", "pug");

//set template dir
app.set("views", path.join(__dirname, "./views"));

//home route
app.use("/",  routes());
app.listen(3000);