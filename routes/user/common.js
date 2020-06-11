

module.exports.common = function (app, controller, error, auth, middleware, schema) {


  app.route("/common/lookup").get(function (request, response) {
    try {
      controller.getLookupData(request, response);
    } catch (err) {
      error(err, response);
    }
  });

  app.route("/common/lookup/countries").post(middleware.validateAjv(schema.common.getCountries), function (request, response) {
    try {
      controller.getCountries(request, response);
    } catch (err) {
      error(err, response);
    }
  });
  app.route("/common/lookup/query").post(middleware.validateAjv(schema.common. getQueries), auth, function (request, response) {
    try {
      controller.getQueries(request, response);
    } catch (err) {
      error(err, response);
    }
  });

};
