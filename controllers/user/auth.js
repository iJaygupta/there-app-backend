let User = require('../../models/user');


module.exports.auth = function (responseFile) {

  return {

    signup: (request, response) => {

      User.getModel().insertMany(request.body).then((result) => {
        if (result) {
          response.json({ error : false , code: responseFile[4000]['code'], msg: responseFile[4000]['msg']});
        }
      })
    },

    login: (request, response) => {

      let email = request.body.email;
      let password = request.body.password;
      User.getModel().findOne({ email: email }).then((result) => {
        if (!result) {
          response.json({ code: 200, msg: "User does not exist" });
        } else {

          console.log("Final data", result);

        }
      })

    },
    logout: (request, response) => {

    }
  }

}
