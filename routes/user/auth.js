module.exports.auth = function (app, controller, error, auth, middleware) {
     
    app.route("user/signup").post(function (request, response) {
        try {
            // console.log(controller);
            // controller.auth.login(request, response);
        }
        catch (err) {       
            error(err, response)
        }
    })

    app.route("/user/login").get(function (request, response) {
        try {

            // controller.auth.login(request, response);
        }
        catch (err) {
            error(err, response)
        }
    })

    app.route("/user/logout").post(function (request, response) {
        try {
       
            // controller.auth.login(request, response);
        }
        catch (err) {
            error(err, response)
        }
    })

}