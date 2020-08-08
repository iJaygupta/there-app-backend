module.exports.common = function (app, controller, error, auth, middleware, schema) {

    app.route("/admin/common/lookup/query").get(auth, function (request, response) {
        try {
            controller.getQueries(request, response);
        }
        catch (err) {
            error(err, response)
        }
    });

    app.route("/admin/contactus").get(auth, (request, response) => {
        try {
            controller.getContactUs(request, response);
        }
        catch (err) {
            error(err, response)
        }
    });


    app.route("/admin/team").post(middleware.validateAjv(schema.common.team), auth, function (request, response) {
        try {
            controller.addTeamMember(request, response);
        }
        catch (err) {
            error(err, response);
        }
    })


}