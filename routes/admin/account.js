module.exports.account = function (
  app,
  controller,
  error,
  auth,
  middleware,
  schema
) {
  app.route("/admin/user").get(function (request, response) {
    try {
      controller.getAllUsers(request, response);
    } catch (err) {
      error(err, response);
    } app.route("/admin/user").get(function (request, response) {
      try {
        controller.getAllUsers(request, response);
      } catch (err) {
        error(err, response);
      }
    });
  });

  app.route("/admin/user").post(function (request, response) {
    try {
      controller.addUserByAdmin(request, response);
    } catch (err) {
      error(err, response);
    }
  });

  app
    .route("/admin/user")
    .put(
      middleware.validateAjv(schema.account.updateUserByAdmin),
      auth,
      function (request, response) {
        try {
          controller.updateUserByAdmin(request, response);
        } catch (err) {
          error(err, response);
        }
      }
    );

  app
    .route("/admin/user")
    .delete(
      middleware.validateAjv(schema.account.deleteUserByAdmin),
      auth,
      function (request, response) {
        try {
          controller.deleteUserByAdmin(request, response);
        } catch (err) {
          error(err, response);
        }
      }
    );
};
