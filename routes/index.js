const express = require("express");
const router = express.Router();
//express validator
const { body } = require("express-validator/check");
const controllers = require("../controllers/projectController");
const taskController = require("../controllers/taskController");
const userController = require("../controllers/userController");
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
    //add task?
    router.post("/projects/:url", taskController.addTask);
    //update task
    router.patch("/tasks/:id", taskController.changeTaskStatus);
    //delete task
    router.delete("/tasks/:id", taskController.deleteTask);
    //create new account
    router.get("/createAccount", userController.formCreateAccount);
    router.post("/createAccount", userController.createAccountPOST);
    return router;
}