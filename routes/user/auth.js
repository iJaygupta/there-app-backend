module.exports.auth = function (app, controller, error, auth, middleware) {
     
    app.route("user/signup").post(function (request, response) {
        try {
            controller.signup(request, response);
        }
        catch (err) {       
            error(err, response)
        }
    })

    app.route("/user/login").post(function (request, response) {
        try {
            controller.login(request, response);
        }
        catch (err) {
            error(err, response)
        }
    })

    app.route("/user/logout").post(function (request, response) {
        try {
            controller.logout(request, response);
        }
        catch (err) {
            error(err, response)
        }
    })

}