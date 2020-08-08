module.exports.account = function (app, controller, error, auth, middleware, schema) {

  app.route("/user/account").get(auth, function (request, response) {
    try {
      controller.getUserAccountDetails(request, response);
    } catch (err) {
      error(err, response);
    }
  });

  app.route("/user/account").put(auth, middleware.validateAjv(schema.account.updateUserAccountDetails), function (request, response) {
    try {
      controller.updateUserAccountDetails(request, response);
    } catch (err) {
      error(err, response);
    }
  }
  );

  app.route("/user/change-password").put(auth, middleware.validateAjv(schema.account.updateUserPassword), function (request, response) {
    try {
      controller.updateUserPassword(request, response);
    } catch (err) {
      error(err, response);
    }
  }
  );

  app.route("/user/add-picture").post(auth, function (request, response) {
    try {
      controller.addUserProfilePicture(request, response);
    } catch (err) {
      error(err, response);
    }
  });

};