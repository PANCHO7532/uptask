const express = require("express");
const router = express.Router();
const controllers = require("../controllers/projectController");
module.exports = function() {
    router.get("/", controllers.r1);
    return router;
}
