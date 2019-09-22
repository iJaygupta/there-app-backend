const Session = require('../models/session');
const random = require("randomstring");


exports.prepareOTPParam = function (type) {

    if (type == "phone") {
        var OTP = Math.floor(100000 + Math.random() * 900000);
        var paramForMsg = `Dear Customer Your Verification Code is ${OTP}`;
    } else {
        OTP = random.generate(6);
        paramForMsg = `Dear Customer Your Verification Code is ${OTP}`;
    }
    return paramForMsg;

}