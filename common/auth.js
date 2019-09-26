const random = require("randomstring");
const User = require("../models/user");
const emailTemplate = require("../lib/templates")


exports.putOTPIntoCollection = function (id, otp, dateTime, type) {
    return new Promise((resolve, reject) => {
        let params = (type == "email") ? { email_otp: otp, email_otp_datetime: dateTime } : { mobile_otp: otp, mobile_otp_datetime: dateTime };
        User.getModel().updateOne({ _id: id }, { $set: { session: params } }).then((data) => {
            resolve()
        }).catch((err) => {
            reject();
        })
    })
}

exports.prepareOTPParam = function (type, otp) {

    return ((type == "phone") ? `Dear Customer Your Verification Code is ${otp}` : emailTemplate.emailSignup(otp));
}


exports.generateOTP = function (type) {

    return (type == "phone" ? Math.floor(100000 + Math.random() * 900000) : random.generate(6));
}