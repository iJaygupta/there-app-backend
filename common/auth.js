const random = require("randomstring");
const Session = require("../models/session");
const emailTemplate = require("../lib/templates")


exports.putOTPIntoCollection = function (id, otp, dateTime, type) {
    return new Promise((resolve, reject) => {
        let params = (type == "email") ? { emailId: id, email_otp: otp, email_otp_datetime: dateTime } : { mobile: id, mobile_otp: otp, mobile_otp_datetime: dateTime };
        Session.getModel().insertMany(params).then((data) => {
            resolve()
        }).catch((err) => {
            console.log(err);
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

exports.getUserOTP = function (id, type) {
    console.log(id);
    return new Promise((resolve, reject) => {
        let params = (type == "phone") ? { mobile: id } : { emailId: id };
        console.log(params);
        Session.getModel().findOne(params).then((data) => {
            resolve(data);
        }).catch((error) => {
            reject(error);
        })
    })
}