const passport = require("passport");
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