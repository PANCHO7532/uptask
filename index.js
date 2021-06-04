const express = require("express");
const routes = require("./routes");
const app = express();

//home route
app.use("/",  routes());
app.listen(3000);