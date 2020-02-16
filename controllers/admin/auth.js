// let User = require('../../models/user');
const auth = require('../../lib/auth');
const bcrypt = require("bcryptjs");


module.exports.auth = function (responseFile, collection) {
  const {User} = collection;
  return {

    signUp: (request, response) => {

      let password = request.body.password;
      let hash = bcrypt.hashSync(password);
      request.body.password = hash;
      User.insertMany(request.body).then((result) => {
        if (result) {
          let output = {
            error: false,
            code: responseFile[4000]['code'],
            msg: responseFile[4000]['msg']
          }
          response.json(output);
        }
      }).catch((error) => {
        let output = {
          error: true,
          msg: responseFile[1000]['msg'],
          code: responseFile[1000]['code'],
        }
        response.status(500).send(output);
      })
    },

    logIn: (request, response) => {
      let email = request.body.email;
      let password = request.body.password;
      User.findOne({ email: email }).then((userDetails) => {
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
                error: true,
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
        let output = {
          error: true,
          msg: responseFile[1000]['msg'],
          code: responseFile[1000]['code'],
        }
        response.status(500).send(output);
      })
    },

    logOut: (request, response) => {

      console.log("Authentication Done");

    },
    sendPhoneCode: (request, response) => {
      User.findById(request.params.id).then(async (userDetails) => {
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
            let output = {
              error: true,
              msg: responseFile[4010]['msg'],
              code: responseFile[4010]['code']
            }
            response.status(200).send(output);
          } else {
            let output = {
              error: false,
              msg: responseFile[4009]['msg'],
              code: responseFile[4009]['code']
            }
            response.status(200).send(output);
          }
        })
      }).catch((error) => {
        let output = {
          error: true,
          msg: responseFile[1000]['msg'],
          code: responseFile[1000]['code'],
        }
        response.status(500).send(output);
      })
    },
    sendEmailCode: (request, response) => {

      User.findById(request.params.id).then(async (userDetails) => {
        let { email } = userDetails;
        if (userDetails.is_email_verified) {
          let output = {
            error: true,
            msg: responseFile[4011]['msg'],
            code: responseFile[4011]['code'],
          }
          response.status(200).send(output);
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
        let output = {
          error: true,
          msg: responseFile[1000]['msg'],
          code: responseFile[1000]['code'],
        }
        response.status(500).send(output);
      })
    },

    verifyEmailCode: async function (request, response) {

      let id = request.body.email;
      let code = request.body.code;
      try {
        let otpData = await util.getUserOTP(id, "email");
        let OTP = otpData[0].email_otp;
        if (OTP == code) {
          let output = {
            error: false,
            msg: responseFile[4016]['msg'],
            code: responseFile[4016]['code'],
          }
          response.status(200).send(output);
        } else {

          let output = {
            error: false,
            msg: responseFile[4018]['msg'],
            code: responseFile[4018]['code'],
          }
          response.status(200).send(output);
        }

      } catch (error) {

        utils.sendResponse(response, true, 500, 1000, "dunzen ");

      }
    }

  }

}