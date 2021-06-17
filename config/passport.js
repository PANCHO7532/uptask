const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

//reference to the model where we are authenticating
const Users = require("../models/Users");

//login with own credentials
passport.use(new LocalStrategy(
    //by default this waits for an user and password
    {
        usernameField: "email",
        passwordField: "passwd"
    },
    async(email, password, done) => {
        //console.log(email);
        //console.log(password);
        //idk
        try {
            const user = await Users.findOne({
                where: {
                    email: email
                }
            });
            //console.log("user object passport");
            //console.log(user.password);
            //user exists, but pass may be incorrect
            if(!user.verifyPassword(password, user.password)) {
                //lol
                //console.log("incorrect password or smth");
                return done(null, false, {
                    message: "Incorrect Password"
                });
            }
            //email exists and also the password is correct
            return done(null, user);
        } catch(error) {
            //not existent user
            //console.log(error);
            return done(null, false, {
                message: "User Account not existent."
            })
        }
    }
));
//serialize user
passport.serializeUser((user, callback) => {
    //console.log("serialization init");
    callback(null, user);
});
//unserialize user
passport.deserializeUser((user, callback) => {
    //console.log("deserialization init");
    callback(null, user);
});
//export it
module.exports = passport;