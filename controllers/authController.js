const passport = require("passport");
const crypto = require("crypto");
const BCrypt = require("bcrypt");
const Users = require("../models/Users");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
//backtick: `
exports.authenticateUser = passport.authenticate("local", {
    //xd
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
});
//is logged?
exports.authenticatedUser = (req, res, next) => {
    if(req.isAuthenticated()) {
        return next();
    }
    return res.redirect("/login");
}
//close session
exports.closeSession = (req, res) => {
    req.session.destroy(() => {
        res.redirect("/login");
    });
}
//token generation if the user is valid
exports.sendToken = async(req, res) => {
    //verify that the user exists
    const user = await Users.findOne({
        where: {
            email: req.body.email
        }
    })
    //if not exists...
    if(!user) {
        req.flash("error", "Inexistent Account");
        res.redirect("/forgotPassword");
        /*res.render("resetPass", {
            title: "Reset Password",
            messages: req.flash()
        })*/ 
    }
    //user exists i guess
    const token = crypto.randomBytes(16).toString("hex");
    const expireDate = Date.now()+3600000;
    user.token = token;
    user.expireDate = expireDate;
    //save changes
    await user.save();
    //generate url
    const resetUrl = `http://${req.headers.host}/forgotPassword/${user.token}`;
    console.log(resetUrl);
}
exports.checkResetPassword = async(req, res) => {
    //check if token is valid and show the prompt for let the user change the password
    const user = await Users.findOne({
        where: {
            token: req.params.token
        }
    });
    if(!user) {
        //not a valid token and by so, not a valid user
        req.flash("error", "Not valid");
        res.redirect("/forgotPassword");
    }
    res.render("resetPass2", {
        title: "Reset Password"
    })
}
exports.updateResetPassword = async(req, res) => {
    //change password for another new one
    const actualToken = req.params.token;
    const user = await Users.findOne({
        where: {
            token: actualToken,
            expireDate: {
                [Op.gte]: Date.now()
            }
        }
    });
    if(!user) {
        req.flash("error", "Not Valid");
        res.redirect("/forgotPassword");
    }
    user.token = null;
    user.expireDate = null;
    //hash password
    user.password = BCrypt.hashSync(req.body.password, BCrypt.genSaltSync(10));
    await user.save();
    req.flash("correcto", "Password changed");
    res.redirect("/login");
}