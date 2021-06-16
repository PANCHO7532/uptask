const Sequelize = require("sequelize");
const db = require("../config/db");
const ProjectModel = require("./Projects");
const Tasks = db.define("tasks", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    task: Sequelize.STRING,
    status: Sequelize.INTEGER(1)
});
Tasks.belongsTo(ProjectModel);
module.exports = Tasks;