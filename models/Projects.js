const Sequelize = require("sequelize");
const configdb = require("../config/db");
const Projects = configdb.define("projects", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING,
    url: Sequelize.STRING
});
module.exports = Projects;