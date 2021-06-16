const { response } = require("express");
const Projects = require("../models/Projects");
const Tasks = require("../models/Tasks");

module.exports.addTask = async(req, res, next) => {
    const projectUrl = await Projects.findOne({
        where: {
            url: req.params.url
        }
    });
    if(!projectUrl) {
        return next();
    }
    //read value from input
    const {task} = req.body;
    const status = 0; //0 = incomplete, 1 = complete
    const projectId = projectUrl.id;
    const result = Tasks.create({
        task, status, projectId
    });
    if(!result) {
        return next();
    }
    //redirect
    res.redirect(`/projects/${req.params.url}`);
}
exports.changeTaskStatus = async(req, res, next) => {
    //console.log(req.params);
    const { id } = req.params;
    const task = await Tasks.findOne({
        where: {
            id: id.split(":")[1]
        }
    });
    //change status
    let status = 0;
    if(task.status == status) {
        status = 1;
    }
    task.status = status;
    const result = await task.save();
    if(!result) {
        return next();
    }
    res.status(201).send("1");
}
exports.deleteTask = async(req, res, next) => {
    //console.log(req.params);
    const {id} = req.params;
    const result = await Tasks.destroy({
        where: {
            id: id.split(":")[1]
        }
    });
    if(!result) {
        return next();
    }
    res.send("1");
}