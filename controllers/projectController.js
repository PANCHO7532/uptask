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