const Users = require("../models/Users");
const crypto = require("crypto");
const sendMailXD = require("../handlers/email");
exports.formCreateAccount = (req, res, next) => {
    //let the fun begin
    //res.send("1");
    res.render("createAccount", {
        title: "Create Account on UpTask"
    });
}
exports.formLoginAccount = (req, res, next) => {
    //let the fun begin
    //res.send("1");
    const {error} = res.locals.messages;
    res.render("login", {
        title: "Login into UpTask",
        error
    });
}
exports.createAccountPOST = async(req, res, next) => {
    //read data
    // console.log(req.body);
    const {email, passwd} = req.body;
    const token = crypto.randomBytes(16).toString("hex");
    //add to db
    try {
        await Users.create({
            email: email,
            password: passwd,
            token: token
        });
        //create confirmation URL
        //activation by providing mail as parameter? how insecure you dumb fuck, let's tokenize it
        const activationUrl = `http://${req.headers.host}/activate/${token}`;
        //create user object
        const user = {
            email
        };
        //send mail
        await sendMailXD.send({
            user,
            subject: "Confirm your account on UpTask",
            activationUrl,
            file: "confirmAccount"
        });
        req.flash("correcto", "Email sent! Confirm your account");
        //redirect user
        res.redirect("/login");
    } catch(error) {
        //console.log("error object for user controller: ");
        //console.log(error);
        req.flash("error", error.errors.map(error => error.message));
        res.render("createAccount",{
            messages: req.flash(),
            title: "Create Account on UpTask",
            emailValue: email
        })
    }
    /*Users.create({
        email: email,
        password: passwd
    }).then((response) => {
        res.redirect("/login");
    }).catch((reject) => {
        return next();
    })*/
}
exports.formReset = (req, res) => {
    res.render("resetPass", {
        title: "Reset Password"
    })
}
exports.activateAccount = async(req, res, next) => {
    //this may be the same as the reboot password thingy
    const user = await Users.findOne({
        where: {
            token: req.params.token
        }
    });
    if(!user) {
        req.flash("error", "Not Valid");
        res.redirect("/login");
    }
    user.active = 1;
    await user.save();
    req.flash("correcto", "Account activated!");
    res.redirect("/login");
}