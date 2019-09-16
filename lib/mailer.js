const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: '',
        pass: ''
    }

})


exports.sendEmail = function (email, subject, msgBody, callback) {
    var mailOptions = {
        from: '"app team" <team@mailinator.com>',
        to: email,
        subject: subject,
        html: msgBody
    };

    transporter.sendMail(mailOptions, (error, info) => {
        let output = {};
        if (error) {
            output.error = true;
            output.msg = "Unable to Send Email";
            output.data = error;
            output.code = 9003;
            return callback(output);
        }
        output.error = false;
        output.msg = "Email Send Successfully";
        output.data = info;
        output.code = 2000;
        return callback(output);
    })
}