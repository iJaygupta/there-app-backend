let User = require('../../models/user');


module.exports.auth = function () {

  return {

    signup: (request, response) => {

      User.getModel().insertMany(request.body);
    

    },
    login: (request, response) => {

    },
    logout: (request, response) => {

    }
  }

}
