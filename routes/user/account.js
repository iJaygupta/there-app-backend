

module.exports.account = function (app, controller, error, auth, middleware, schema) {

    app.route("/user/account").get(auth, function (request, response) {
        try {
            controller.getUserAccountDetails(request, response);
        }
        catch (err) {
            error(err, response)
        }
    })

   /* app.route("/user/account").post(auth, function (request, response) {
        try {
            controller.addUserAccountDetails(request, response);
        }
        catch (err) {
            error(err, response)
        }
    })*/

    app.route("/user/account").put(middleware.validateAjv(schema.account.updateUserAccountDetails), auth, function (request, response) {
        try {
            controller.updateUserAccountDetails(request, response);
        }
        catch (err) {
            error(err, response)
        }
    })

    app.route("/user/change-password").put(middleware.validateAjv(schema.account.updateUserPassword), auth, function (request, response) {
        try {
            controller.updateUserPassword(request, response);
        }
        catch (err) {
            error(err, response)
        }
    })

    app.route("/user/add-picture").post(auth, function (request, response) {
        try {
            controller.addUserProfilePicture(request, response);
        }
        catch (err) {
            error(err, response)
        }
    })

}