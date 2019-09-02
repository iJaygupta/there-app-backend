

module.exports.auth = function (app, controller, error, auth, middleware) {
     
    app.route("/admin/signup").post(function (request, response) {
        try {
            controller.signup(request, response);
        }
        catch (err) {
            console.log(err);
            // error(err, response)
        }
    })

    app.route("/admin/login").get(function (request, response) {
        try {

            // controller.login(request, response);
        }
        catch (err) {
            error(err, response)
        }
    })

    app.route("/admin/logout").post(function (request, response) {
        try {

            // controller.login(request, response);
        }
        catch (err) {
            error(err, response)
        }
    })

}