const random = require("randomstring");
const emailTemplate = require("../lib/templates");
// const Session = require("../models/session");
// const User = require("../models/user");
const moment = require("moment")


exports.putOTPIntoCollection = function (user_id, id, otp, dateTime, type, collection) {
    const {Session} = collection
    return new Promise((resolve, reject) => {
        let params = (type == "email") ? { user_id: user_id, email: id, email_otp: otp, email_otp_datetime: dateTime } : { user_id: user_id, mobile: id, mobile_otp: otp, mobile_otp_datetime: dateTime };
        Session.insertMany(params).then((data) => {
            resolve(data)
        }).catch((err) => {
            reject(err);
        })
    })
}

exports.updateVerifyStatus = function (id, type, collection) {
    const {User} = collection
    return new Promise((resolve, reject) => {
        let params = (type == "email") ? { is_email_verified: true } : { is_phone_verified: true };
        User.updateOne({ _id: id }, { $set: params }).then((data) => {
            resolve()
        }).catch((error) => {
            reject(error);
        })
    })
}

exports.prepareOTPParam = function (type, otp) {

    return ((type == "phone") ? `Dear Customer Your Verification Code is ${otp}` : emailTemplate.emailTemplate('userRegistration', otp));
}


exports.generateOTP = function (type) {

    return (type == "phone" ? Math.floor(100000 + Math.random() * 900000) : random.generate(6));
}

exports.getUserOTP = function (user_id, id, type, collection) {
    const {Session} = collection
    return new Promise((resolve, reject) => {
        let params = (type == "phone") ? { user_id: user_id, mobile: id } : { user_id: user_id, email: id };
        let sortKey = (type == "phone") ? { mobile_otp_datetime: -1 } : { email_otp_datetime: -1 }
        Session.find(params).sort(sortKey).limit(1).then((data) => {
            resolve(data);
        }).catch((error) => {
            reject(error);
        })
    })
}

exports.updateProfilePicDetails = function (id, profilePic, collection) {
    const {User} = collection
    return new Promise((resolve, reject) => {
        User.updateOne({ "_id": id }, { $set: { "profilePic": profilePic } }).then((data) => {
            resolve();
        }).catch((err) => {
            reject();
        })
    })
}

exports.isOTPNotExpired = (lastOTPSentTime, type) => {
    let timeDiff = calculateTimeDiff(lastOTPSentTime);
    let validTime = type == "email" ? process.env.EMAIL_OTP_VALID_TIME : process.env.PHONE_OTP_VALID_TIME
    if (timeDiff > validTime) {
        return false;
    } else {
        return true;
    }
}

 const calculateTimeDiff = (lastOTPSentTime) => {
    var now = moment(new Date()); //todays date
    var end = moment(lastOTPSentTime); // another date
    var duration = moment.duration(now.diff(end));
    return duration.asMinutes();
}

