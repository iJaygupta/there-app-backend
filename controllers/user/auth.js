let User = require('../../models/user');
const auth = require('../../lib/auth');
const bcrypt = require("bcryptjs");

module.exports.auth = function (responseFile) {

  return {

    signup: (request, response) => {

      let password = request.body.password;
      let hash = bcrypt.hashSync(password);
      request.body.password = hash;
      User.getModel().insertMany(request.body).then((result) => {
        if (result) {
          response.json({ error: false, code: responseFile[4000]['code'], msg: responseFile[4000]['msg'] });
        }
      })
    },

    login: (request, response) => {
      let email = request.body.email;
      let password = request.body.password;
      User.getModel().findOne({ email: email }).then((userDetails) => {
        if (!userDetails) {
          response.status(200).send({ error: false, msg: responseFile[4002]['msg'], code: responseFile[4002]['code'] });
        } else {
          bcrypt.compare(password, userDetails.password, async (error, result) => {
            if (error) {
              response.status(500).send({ error: false, msg: responseFile[4005]['msg'], code: responseFile[4005]['code'] });
            } else if (!result) {
              response.status(200).send({ error: false, msg: responseFile[4007]['msg'], code: responseFile[4007]['code'] });
            } else {
              let payload = {
                email: userDetails.email,
                name: userDetails.name,
                mobile: userDetails.mobile
              }

              let token = await auth.generateAuthToken(payload);
              response.status(200).send({ error: false, msg: responseFile[4001]['msg'], code: responseFile[4001]['code'], token: token, data: payload });
            }
          });

        }
      })

    },
    logout: (request, response) => {

      console.log("Authentication Done");

    }
  }

}
