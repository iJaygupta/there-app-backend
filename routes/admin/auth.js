

module.exports.auth = function (app, controller, error, auth, middleware) {
     
    app.route("/admin/signup").post(function (request, response) {
        try {
            controller.signUp(request, response);
        }
        catch (err) {
            
            error(err, response)
        }
    })

    app.route("/admin/login").post(function (request, response) {
        try {
            controller.logIn(request, response);
        }
        catch (err) {
            error(err, response)
        }
    })

    app.route("/admin/logout").get(function (request, response) {
        try {
            controller.logout(request, response);
        }
        catch (err) {
            error(err, response)
        }
    })

}