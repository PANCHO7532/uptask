const Sequelize = require("sequelize");
//read variables.env
require("dotenv").config({
    path: "variables.env"
});
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: "mysql",
    port: process.env.DB_PORT,
    define: {
        timestamps: false
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});
module.exports = sequelize;