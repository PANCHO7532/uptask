const passport = require("passport");
exports.authenticateUser = passport.authenticate("local", {
    //xd
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
});