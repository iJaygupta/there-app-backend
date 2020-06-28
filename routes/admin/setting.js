module.exports.account = function (
  app,
  controller,
  error,
  auth,
  middleware,
  schema
) {
  app.route("/admin/setting").get(function (request, response) {
    try {
      controller.getAdmin(request, response);
    } catch (err) {
      error(err, response);
    }
  });

  app.route("/admin/setting").post(function (request, response) {
    try {
      controller.addAdmin(request, response);
    } catch (err) {
      error(err, response);
    }
  });

  app
    .route("/admin/setting")
    .put(
      middleware.validateAjv(schema.account.updateAdminEmail),
      auth,
      function (request, response) {
        try {
          controller.updateAdmin(request, response);
        } catch (err) {
          error(err, response);
        }
      }
    );

  app
    .route("/admin/setting")
    .delete(
      middleware.validateAjv(schema.account.deleteAdminEmail),
      auth,
      function (request, response) {
        try {
          controller.deleteAdmin(request, response);
        } catch (err) {
          error(err, response);
        }
      }
    );
};
