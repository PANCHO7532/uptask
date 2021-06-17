const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const flash = require("connect-flash");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");
const passport = require("./config/passport");
const routes = require("./routes");
const helpers = require("./helpers");
const app = express();

//set static stuff
app.use(express.static("public"));

//enable pug
app.set("view engine", "pug");

//enable bodyparser
app.use(bodyParser.urlencoded({extended: true})) //deprecated lol

//express validator
//app.use(expressValidator());

//db
const db = require("./config/db.js");
require("./models/Projects");
require("./models/Tasks");
require("./models/Users");
db.sync().then(() => console.log("conectado :v"))
                .catch((e) => console.log(e));

//set template dir
app.set("views", path.join(__dirname, "./views"));

//flash
app.use(flash());

//sessions
app.use(session({
    secret: "supersecretXD",
    resave: false,
    saveUninitialized: false
}));

//passport
app.use(passport.initialize());
app.use(passport.session());

//vardump xd
app.use((req, res, next) => {
    res.locals.vardump = helpers.vardump;
    res.locals.messages = req.flash();
    next();
});

//home route
app.use("/",  routes());
app.listen(3000);