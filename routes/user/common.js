

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
  app.route("/common/lookup/query").post(middleware.validateAjv(schema.common.addQuery), auth, function (request, response) {
    try {
      controller.addQuery(request, response);
    } catch (err) {
      error(err, response);
    }
  });

  app.route("/common/contactUs").post(middleware.validateAjv(schema.common.contactUs),auth, function(request,response){
    try{
      controller.contactUs(request,response);
    }
    catch(err){
      console.log(err);
      error(err,response);
    }
  });

  app.route("/common/team").get(function (request, response) {
    try {
      controller.getTeam(request,response);
    } catch (err) {
      error(err, response);
    }
  });


};
