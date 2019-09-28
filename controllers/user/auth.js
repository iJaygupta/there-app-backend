let User = require('../../models/user');
const auth = require('../../lib/auth');
const bcrypt = require("bcryptjs");
const smsService = require('../../lib/sms');
const emailService = require('../../lib/mailer');
const util = require('../../common/auth');
const responseFile = require('../../lib/response');


module.exports.auth = function (utils) {

  return {

    signUp: (request, response) => {

      let password = request.body.password;
      let hash = bcrypt.hashSync(password);
      request.body.password = hash;
      User.getModel().insertMany(request.body).then((result) => {
        if (result) {
          utils.sendResponse(response, false, 200, 4000);
        }
      }).catch((error) => {
        utils.sendResponse(response, true, 500, 1000);
      })
    },

    logIn: (request, response) => {
      let email = request.body.email;
      let password = request.body.password;
      User.getModel().findOne({ email: email }).then((userDetails) => {
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
                email: userDetails.email,
                name: userDetails.name,
                mobile: userDetails.mobile
              }
              let token = await auth.generateAuthToken(payload);
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

    logOut: (request, response) => {

      console.log("Authentication Done");

    },
    sendPhoneCode: (request, response) => {
      User.getModel().findById(request.params.id).then(async (userDetails) => {
        let { mobile } = userDetails;
        if (userDetails.is_phone_verified) {
          console.log("phone already verified");
        }
        let OTP = util.generateOTP("phone");
        let paramForMsg = util.prepareOTPParam("phone", OTP);
        let otpDateTime = new Date();
        await util.putOTPIntoCollection(mobile, OTP, otpDateTime, "phone");

        smsService.sendMsg(paramForMsg, "+919897821299", function (err, done) {
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

      User.getModel().findById(request.params.id).then(async (userDetails) => {
        let { email } = userDetails;
        if (userDetails.is_email_verified) {
          utils.sendResponse(response, false, 200, 4011);
        }
        let OTP = util.generateOTP("email");
        let paramForMsg = util.prepareOTPParam("email", OTP);
        let otpDateTime = new Date();
        await util.putOTPIntoCollection(email, OTP, otpDateTime, "email");

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

    verifyEmailCode: async function (request, response) {

      let id = request.body.email;
      let code = request.body.code;
      let _id = request.body.id;
      try {
        let otpData = await util.getUserOTP(id, "email");
        let OTP = otpData[0] ? otpData[0].email_otp : "";
        if (OTP == code) {
          await util.updateVerifyStatus(_id, "email")
          utils.sendResponse(response, false, 200, 4016);
        } else {
          utils.sendResponse(response, false, 200, 4018);
        }
      } catch (error) {
        utils.sendResponse(response, true, 500, 1000);
      }
    }

  }

}
