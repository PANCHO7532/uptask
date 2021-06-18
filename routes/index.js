const express = require("express");
const router = express.Router();
//express validator
const { body } = require("express-validator/check");
const controllers = require("../controllers/projectController");
const taskController = require("../controllers/taskController");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
module.exports = function() {
    router.get("/", authController.authenticatedUser, controllers.r1);
    router.get("/newProject", authController.authenticatedUser, controllers.newProject);
    router.post("/newProject", authController.authenticatedUser, body("name").not().isEmpty().trim().escape(), controllers.newProjectPOST);
    router.get("/projects/:url", authController.authenticatedUser, controllers.projectByURL);
    //update project
    router.get("/project/edit/:id", authController.authenticatedUser, controllers.editForm);
    router.post("/newProject/:id", authController.authenticatedUser, body("name").not().isEmpty().trim().escape(), controllers.updateProjectPOST);
    //delete project
    router.delete("/projects/:url", authController.authenticatedUser, controllers.deleteProject);
    //add task?
    router.post("/projects/:url", authController.authenticatedUser, taskController.addTask);
    //update task
    router.patch("/tasks/:id", authController.authenticatedUser, taskController.changeTaskStatus);
    //delete task
    router.delete("/tasks/:id", authController.authenticatedUser, taskController.deleteTask);
    //create new account
    router.get("/createAccount", userController.formCreateAccount);
    router.post("/createAccount", userController.createAccountPOST);
    router.get("/activate/:token", userController.activateAccount);
    //login
    router.get("/login", userController.formLoginAccount);
    router.post("/login", authController.authenticateUser);
    //logout
    router.get("/logout", authController.closeSession);
    //password reset
    router.get("/forgotPassword", userController.formReset);
    router.get("/forgotPassword/:token", authController.checkResetPassword);
    router.post("/resetPassAction", authController.sendToken);
    router.post("/forgotPassword/:token", authController.updateResetPassword);
    return router;
}