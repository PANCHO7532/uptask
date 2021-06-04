const express = require("express");
const router = express.Router();
const controllers = require("../controllers/projectController");
module.exports = function() {
    router.get("/", controllers.r1);
    router.get("/newProject", controllers.newProject);
    router.post("/newProject", controllers.newProjectPOST);
    return router;
}
