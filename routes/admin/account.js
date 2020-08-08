
module.exports.account = function (app, controller, error, auth, middleware, schema) {

  app.route("/admin/user").get(auth, function (request, response) {
    try {
      controller.getAllUsers(request, response);
    } catch (err) {
      error(err, response);
    }
  });

  app.route("/admin/user").post(auth, middleware.validateAjv(schema.account.addUserByAdmin), function (request, response) {
    try {
      controller.addUserByAdmin(request, response);
    } catch (err) {
      error(err, response);
    }
  });

  app.route("/admin/user/:userId").put(auth, middleware.validateAjv(schema.account.updateUserByAdmin), function (request, response) {
    try {
      controller.updateUserByAdmin(request, response);
    } catch (err) {
      error(err, response);
    }
  }
  );

  app.route("/admin/user/:userId").delete(auth, function (request, response) {
    try {
      controller.deleteUserByAdmin(request, response);
    } catch (err) {
      error(err, response);
    }
  }
  );
};
