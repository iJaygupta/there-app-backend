let User = require('../../models/user');
const auth = require('../../lib/auth');


module.exports.auth = function (responseFile) {

  return {

    signup: (request, response) => {

      User.getModel().insertMany(request.body).then((result) => {
        if (result) {
          response.json({ error: false, code: responseFile[4000]['code'], msg: responseFile[4000]['msg'] });
        }
      })
    },

    login: (request, response) => {

      let email = request.body.email;
      let password = request.body.password;
      User.getModel().findOne({ email: email }).then(async (result) => {
        if (!result) {
          response.json({ code: 200, msg: "User does not exist" });
        } else {

          let payload = {
            email: result.email,
            name: result.name,
            mobile: result.mobile
          }
          
          let token = await auth.generateAuthToken(payload);
          return response.status(200).send({ error: false, msg: responseFile[4001]['msg'] ,token: token, data: payload });

        }
      })

    },
    logout: (request, response) => {

      console.log("Authentication Done");

    }
  }

}
