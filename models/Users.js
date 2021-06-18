const Sequelize = require("sequelize");
const db = require("../config/db");
const Projects = require("./Projects");
const BCrypt = require("bcrypt");
const Users = db.define("users", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: Sequelize.STRING(60),
        allowNull: false,
        validate: {
            isEmail: {
                msg: "Please add a valid mail!"
            },
            notEmpty: {
                msg: "Email can't be empty"
            }
        },
        unique: {
            args: true,
            msg: "User already registered!"
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Password cannot be empty"
            }
        }
    },
    active: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    token: Sequelize.STRING,
    expireDate: Sequelize.DATE
},{
    hooks: {
        beforeCreate(user) {
            user.password = BCrypt.hashSync(user.password, BCrypt.genSaltSync(10));
        }
    }
});
//custom methods
Users.prototype.verifyPassword = (password, crypted) => {
    //console.log("password point");
    //console.log(password);
    //console.log("password crypted");
    //console.log(crypted);
    return BCrypt.compareSync(password, crypted);
}
Users.hasMany(Projects);
module.exports = Users;