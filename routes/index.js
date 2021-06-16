const express = require("express");
const router = express.Router();
//express validator
const { body } = require("express-validator/check");
const controllers = require("../controllers/projectController");
module.exports = function() {
    router.get("/", controllers.r1);
    router.get("/newProject", controllers.newProject);
    router.post("/newProject", body("name").not().isEmpty().trim().escape(), controllers.newProjectPOST);
    router.get("/projects/:url", controllers.projectByURL);
    //update project
    router.get("/project/edit/:id", controllers.editForm);
    router.post("/newProject/:id", body("name").not().isEmpty().trim().escape(), controllers.updateProjectPOST);
    //delete project
    router.delete("/projects/:url", controllers.deleteProject);
    return router;
}
