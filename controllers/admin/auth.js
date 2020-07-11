//let User = require('../../models/user');
const auth = require('../../lib/auth');
const bcrypt = require("bcryptjs");
const smsService = require('../../lib/sms');
const emailService = require('../../lib/mailer');
const util = require('../../common/auth');
const responseFile = require('../../lib/response');


module.exports.auth = function (utils, collection) {
  const { User, Session } = collection;
  return {
    signUp: (request, response) => {

      let password = request.body.password;
      let hash = bcrypt.hashSync(password);
      request.body.password = hash;
      request.body.is_active = true;
      request.body.role = "admin";
      request.body.userTypeId = 1;

      User.findOne({ "mobile": request.body.mobile }).then((userDetails) => {
        if (!userDetails) {
          User.insertMany(request.body).then((result) => {
            if (result) {
              utils.sendResponse(response, false, 200, 4000);
            }
          }).catch((error) => {
            utils.sendResponse(response, true, 500, 1000);
          })

        } else if (userDetails && userDetails.mobile === request.body.mobile && userDetails.is_active === false) {
          User.findOneAndUpdate({ "mobile": request.body.mobile }, { $set: { "is_active": true } }).then((result) => {
            if (result) {
              utils.sendResponse(response, false, 200, 4000);
            }
          }).catch((error) => {
            utils.sendResponse(response, true, 500, 1000);
          })
        }
        else {
          utils.sendResponse(response, false, 200, 4034);
        }
      })

    },
    logIn: (request, response) => {
      let mobile = request.body.mobile;
      let password = request.body.password;
      User.findOne({ mobile: mobile, is_active: true, "role": "admin", "userTypeId": 1 }).then((userDetails) => {
        if (!userDetails) {
          utils.sendResponse(response, false, 200, 4002);
        } else {
          bcrypt.compare(password, userDetails.password, async (error, result) => {
            if (error) {
              utils.sendResponse(response, true, 400, 4005);
            } else if (!result) {
              utils.sendResponse(response, false, 200, 4007);
            } else {
              let payload = {
                id: userDetails._id,
                userTypeId: userDetails.userTypeId,
                role: userDetails.role
              }
              let token = await auth.generateAuthToken(payload);
              payload['is_phone_verified'] = userDetails.is_phone_verified;
              let output = {
                error: false,
                msg: responseFile[4001]['msg'],
                code: responseFile[4001]['code'],
                token: token,
                data: payload
              }
              response.status(200).send(output);
            }
          });

        }
      }).catch((error) => {
        utils.sendResponse(response, true, 500, 1000);
      })
    },
    sendPhoneCode: (request, response) => {
      let user_id = request.headers.payload.id;
      User.findById(user_id).then(async (userDetails) => {
        let { mobile } = userDetails;
        if (userDetails.is_phone_verified) {
          return utils.sendResponse(response, false, 200, 4020);
        }
        let OTP = util.generateOTP("phone");
        let paramForMsg = util.prepareOTPParam("phone", OTP);
        let otpDateTime = new Date();
        await util.putOTPIntoCollection(user_id, mobile, OTP, otpDateTime, "phone", Session);

        smsService.sendMsg(paramForMsg, mobile, function (err, done) {
          if (err) {
            utils.sendResponse(response, true, 200, 4010);
          } else {
            utils.sendResponse(response, false, 200, 4009);
          }
        })
      }).catch((error) => {
        utils.sendResponse(response, true, 500, 1000);
      })
    },
    sendEmailCode: (request, response) => {

      let user_id = request.headers.payload.id;
      User.findById(user_id).then(async (userDetails) => {
        let { email } = userDetails;
        if (userDetails.is_email_verified) {
          return utils.sendResponse(response, false, 200, 4011);
        }
        let OTP = util.generateOTP("email");
        let paramForMsg = util.prepareOTPParam("email", OTP);
        let otpDateTime = new Date();
        await util.putOTPIntoCollection(user_id, email, OTP, otpDateTime, "email", Session);

        emailService.sendEmail(email, "Verification", paramForMsg, function (output) {
          if (!output.error) {
            response.status(200).send(output);
          } else {
            response.status(400).send(output);
          }
        })
      }).catch((error) => {
        utils.sendResponse(response, true, 500, 1000);
      })
    },
  }

}