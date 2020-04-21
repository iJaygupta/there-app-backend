const random = require("randomstring");
const emailTemplate = require("../lib/templates");
const moment = require("moment");
const elasticHandler = require("../lib/elasticSearch");



exports.putOTPIntoCollection = function (user_id, id, otp, dateTime, type, Session) {
    return new Promise((resolve, reject) => {
        let params = (type == "email") ? { user_id: user_id, email: id, email_otp: otp, email_otp_datetime: dateTime } : { user_id: user_id, mobile: id, mobile_otp: otp, mobile_otp_datetime: dateTime };
        Session.insertMany(params).then((data) => {
            resolve(data)
        }).catch((err) => {
            reject(err);
        })
    })
}

exports.updateVerifyStatus = function (id, type, User) {
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

    return ((type == "phone") ? `Dear Customer, Please confirm your phone number to complete your registration. Your verification code is ${otp} and expires in ${process.env.PHONE_OTP_VALID_TIME} minutes.\nThanks,\nThere App Dev Team. ` : emailTemplate.emailTemplate('userRegistration', otp));
}


exports.generateOTP = function (type) {

    return (type == "phone" ? Math.floor(100000 + Math.random() * 900000) : random.generate(6));
}

exports.getUserOTP = function (user_id, id, type, Session) {
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

exports.updateProfilePicDetails = function (id, profilePic, User) {
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


exports.addUserDocument = function (userDetails) {

    if (userDetails && userDetails._id) {
        let userDocument = { 
            "user_id": userDetails._id,
            "email": userDetails.email,
            "mobile": userDetails.mobile,
            "registered_on": userDetails.registered_on,
            "user_name": userDetails.name,
            "roleId": userDetails.roleId,
            "status": {},
            "status_visible_to": [],
            "availability": {},
            "availability_visible_to": [],
            "profile_pic":  userDetails.profilePic,
            "alternate_names": [],
            "bio": userDetails.bio
        }

        elasticHandler.addDocument(String(userDetails._id), process.env.ELASTIC_USER_INDEX, process.env.ELASTIC_USER_DOC_TYPE, userDocument)
            .then((data) => {
            }).catch((error) => {
                console.log(error);
            })
    }

}
