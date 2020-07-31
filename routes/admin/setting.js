module.exports.setting = function (app, controller, error, auth, middleware, schema) {

  app.route("/admin/setting").get(auth, function (request, response) {
    try {
      controller.getSetting(request, response);
    } catch (err) {
      error(err, response);
    }
  });

  app.route("/admin/setting").post(auth, middleware.validateAjv(schema.setting.addSetting), function (request, response) {
    try {
      controller.addSetting(request, response);
    } catch (err) {
      error(err, response);
    }
  });

  app.route("/admin/setting/:settingId").put(auth, middleware.validateAjv(schema.setting.updateSetting), function (request, response) {
    try {
      controller.updateSetting(request, response);
    } catch (err) {
      error(err, response);
    }
  }
  );

  app.route("/admin/setting/:settingId").delete(auth, function (request, response) {
    try {
      controller.deteteSetting(request, response);
    } catch (err) {
      error(err, response);
    }
  }
  );

};
