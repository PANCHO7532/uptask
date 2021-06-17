const passport = require("passport");
const crypto = require("crypto");
const Users = require("../models/Users");
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
    //TODO
}