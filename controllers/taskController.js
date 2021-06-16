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