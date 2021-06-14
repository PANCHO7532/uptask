const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const routes = require("./routes");
const helpers = require("./helpers");
const app = express();

//db
const db = require("./config/db.js");
require("./models/Projects");
db.sync().then(() => console.log("conectado :v"))
                .catch((e) => console.log(e));
//set static stuff
app.use(express.static("public"));

//enable pug
app.set("view engine", "pug");

//set template dir
app.set("views", path.join(__dirname, "./views"));

//vardump xd
app.use((req, res, next) => {
    res.locals.vardump = helpers.vardump;
    next();
});

//enable bodyparser
app.use(bodyParser.urlencoded({extended: true})) //deprecated lol

//home route
app.use("/",  routes());
app.listen(3000);