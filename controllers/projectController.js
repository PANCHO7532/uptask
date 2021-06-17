const Projects = require("../models/Projects");
const Tasks = require("../models/Tasks");
//const projects = require("../models/Projects"); //remind me to check if this is useful
exports.r1 = async (req, res) => {
    const userId = res.locals.user.id;
    const projects = await Projects.findAll({
        where: {
            userId
        }
    });
    res.render("index", {
        title: "Index",
        projects
    });
};
exports.newProject = async (req, res) => {
    const userId = res.locals.user.id;
    const projects = await Projects.findAll({
        where: {
            userId
        }
    });
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
        const userId = res.locals.user.id;
        const project = await Projects.create({ name, userId });
        res.redirect("/");
    }
}
exports.projectByURL = async(req, res, next) => {
    const userId = res.locals.user.id;
    const projects = await Projects.findAll({
        where: {
            userId
        }
    });
    const project = await Projects.findOne({
        where: {
            url: req.params.url,
            userId
        }
    });
    /*
    console.log("project object:");
    console.log(project);
    console.log("projects object:");
    console.log(projects)
    */
    //checking tasks
    const tasks = await Tasks.findAll({
        where: {
            projectId: project.id
        }
    });
    if(!project) {
        next();
    }
    //res.send("Done! :D");
    res.render("tasks", {
        title: "Project Tasks",
        project,
        projects,
        tasks
    })
}
exports.editForm = async(req, res) => {
    const userId = res.locals.user.id;
    const projectsPromise = Projects.findAll({
        where: {
            userId
        }
    });
    const projectPromise = Projects.findOne({
        where: {
            id: req.params.id,
            userId
        }
    });
    const [projects, project] = await Promise.all([projectsPromise, projectPromise]);
    res.render("newProject", {
        title: "Edit Project",
        projects,
        project
    })
}
exports.updateProjectPOST = async(req, res) => {
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
        await Projects.update({
            name: name
        }, {
            where: {
                id: req.params.id
            }
        });
        res.redirect("/");
    }
}
exports.deleteProject = async(req, res, next) => {
    //console.log(req);
    const {reqUrl} = req.query;
    const result = await Projects.destroy({
        where: {
            url: reqUrl
        }
    });
    if(!result) {
        next();
    }
    res.send("1");
}