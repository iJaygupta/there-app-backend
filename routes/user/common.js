module.exports.common = function(
  app,
  controller,
  error,
  auth,
  middleware,
  schema
) {
  app.route("/common/get-questions-address").get(function(request, response) {
    try {
      controller.getQuestionsAddress(request, response);
    } catch (err) {
      error(err, response);
    }
  });
};
