const Projects = require("../models/Projects");
const projects = require("../models/Projects");
exports.r1 = (req, res) => {
    res.render("index", {
        title: "Index"
    });
};
exports.newProject = (req, res) => {
    res.render("newProject", {
        title: "New Project"
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
        const project = await Projects.create({ name });
        res.redirect("/");
    }
}