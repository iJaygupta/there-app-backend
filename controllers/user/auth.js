let User = require('../../models/user');
const auth = require('../../lib/auth');
const bcrypt = require("bcryptjs");
const smsService = require('../../lib/sms');
const emailService = require('../../lib/mailer');
const util = require('../../common/auth');



module.exports.auth = function (responseFile) {

  return {

    signUp: (request, response) => {

      let password = request.body.password;
      let hash = bcrypt.hashSync(password);
      request.body.password = hash;
      User.getModel().insertMany(request.body).then((result) => {
        if (result) {
          let output = {
            error: false,
            code: responseFile[4000]['code'],
            msg: responseFile[4000]['msg']
          }
          response.json(output);
        }
      })
    },

    logIn: (request, response) => {
      let email = request.body.email;
      let password = request.body.password;
      User.getModel().findOne({ email: email }).then((userDetails) => {
        if (!userDetails) {
          let output = {
            error: false,
            msg: responseFile[4002]['msg'],
            code: responseFile[4002]['code']
          }
          response.status(200).send(output);
        } else {
          bcrypt.compare(password, userDetails.password, async (error, result) => {
            if (error) {
              let output = {
                error: false,
                msg: responseFile[4005]['msg'],
                code: responseFile[4005]['code']
              }
              response.status(500).send(output);
            } else if (!result) {
              let output = {
                error: false,
                msg: responseFile[4007]['msg'],
                code: responseFile[4007]['code']
              }
              response.status(200).send(output);
            } else {
              let payload = {
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
      })
    },

    logOut: (request, response) => {

      console.log("Authentication Done");

    },
    sendPhoneCode: (request, response) => {
      User.getModel().findById(request.params.id).then((userDetails) => {
        let { mobile } = userDetails;
        if (userDetails.is_phone_verified) {
          console.log("phone already verified");
        }
        let OTP = util.generateOTP("phone");
        let paramForMsg = util.prepareOTPParam("phone", OTP);

        smsService.sendMsg(paramForMsg, "+919897821299", function (err, done) {
          if (err) {
            console.log("error from sendMsg", err);
          } else {
            let otpDateTime = new Date();
            util.putOTPIntoCollection(request.params.id, OTP, otpDateTime, "phone");
            console.log("success", done);
          }
        })
      })
    },
    sendEmailCode: (request, response) => {

      User.getModel().findById(request.params.id).then((userDetails) => {
        let { email } = userDetails;
        if (userDetails.is_email_verified) {
          console.log("Email already verified");
        }
        let OTP = util.generateOTP("email");
        let paramForMsg = util.prepareOTPParam("email", OTP);

        emailService.sendEmail("jayguptazzz@outlook.com", "Verification", paramForMsg, function (output) {
          response.status(200).send(output);
          if (!output.error) {
            let otpDateTime = new Date();
            util.putOTPIntoCollection(request.params.id, OTP, otpDateTime);
          }
        })
      })
    }
  }

}
