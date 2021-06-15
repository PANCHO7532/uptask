const Projects = require("../models/Projects");
//const projects = require("../models/Projects"); //remind me to check if this is useful
exports.r1 = async (req, res) => {
    const projects = await Projects.findAll()
    res.render("index", {
        title: "Index",
        projects
    });
};
exports.newProject = async (req, res) => {
    const projects = await Projects.findAll()
    res.render("newProject", {
        title: "New Project",
        projects
    })
}
exports.newProjectPOST = async(req, res) => {
    const { name } = req.body;
    let err = [];
    console.log(name);
    if(!name || name.length < 1) {
        err.push({
            'text': "Add a name to your project!"
        })
    }
    if(err.length > 0) {
        res.render("newProject", {
            title: "New Project",
            err
        })
    } else {
        //para database
        //const url = require("slug")(name).toLowerCase();
        const project = await Projects.create({ name });
        res.redirect("/");
    }
}
exports.projectByURL = async(req, res, next) => {
    const projects = await Projects.findAll();
    const project = await Projects.findOne({
        where: {
            url: req.params.url
        }
    });
    console.log("projects object:");
    console.log(project);
    if(!project) {
        next();
    }
    //res.send("Done! :D");
    res.render("tasks", {
        title: "Project Tasks",
        project,
        projects
    })
}
exports.editForm = async(req, res) => {
    const projects = await Projects.findAll();
    res.render("newProject", {
        title: "Edit Project",
        projects
    })
}