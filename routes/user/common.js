module.exports.common = function (
  app,
  controller,
  error,
  auth,
  middleware,
  schema
) {
  app.route("/common/lookup").get(function (request, response) {
    try {
      controller.getLookupData(request, response);
    } catch (err) {
      error(err, response);
    }
  });
};
