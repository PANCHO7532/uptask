const Sequelize = require("sequelize");
const configdb = require("../config/db");
const shortid = require("shortid");
const Projects = configdb.define("projects", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING,
    url: Sequelize.STRING
}, {
    hooks: {
        beforeCreate(project) {
            const url = require("slug")(project.name).toLowerCase();
            project.url = `${url}-${shortid.generate()}`;
        }
    }
});
module.exports = Projects;