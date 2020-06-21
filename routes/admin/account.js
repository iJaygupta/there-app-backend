

module.exports.account = function (app, controller, error, auth, middleware) {

    app.route("/admin/user").get(auth, function (request, response) {
        try {
            controller.getAllUsers(request, response);
        }
        catch (err) {
            error(err, response)
        }
    })
}