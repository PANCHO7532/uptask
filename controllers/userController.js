const Users = require("../models/Users");
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
    //add to db
    try {
        await Users.create({
            email: email,
            password: passwd
        });
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