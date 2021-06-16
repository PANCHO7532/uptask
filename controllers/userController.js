exports.formCreateAccount = (req, res, next) => {
    //let the fun begin
    //res.send("1");
    res.render("createAccount", {
        title: "Create Account on UpTask"
    });
}