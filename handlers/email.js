const nodemailer = require("nodemailer");
const pug = require("pug");
const juice = require("juice");
const htmlToText = require("html-to-text");
const util = require("util");
const emailConfig = require("../config/email");

let transport = nodemailer.createTransport({
    host: emailConfig.host,
    port: emailConfig.port,
    auth: {
        user: emailConfig.user,
        pass: emailConfig.pass
    }
});
const generateHTML = (file, opts) => {
    const html = pug.renderFile(__dirname + "/../views/emails/" + file + ".pug", opts);
    return juice(html); 
}
exports.send = async(opt) => {
    const htmlContent = generateHTML(opt.file, opt)
    const textContent = htmlToText.fromString(htmlContent);
    let mailOpts = {
        from: "UpTask <uptask@p7com.net>",
        to: opt.user.email,
        subject: opt.subject,
        text: textContent,
        html: htmlContent
    }
    const sendTheMail = util.promisify(transport.sendMail, transport);
    return sendTheMail.call(transport, mailOpts);
    //transport.sendMail(mailOpts);
}