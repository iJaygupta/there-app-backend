



module.exports.auth = function (params) {

  return {
    signup: (request, reponse) => {
      User.getModel().insertOne(request.body);

    },

    login: (request, reponse) => {

    },

    logout: (request, reponse) => {

    }
  }

}
