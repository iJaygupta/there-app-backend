

module.exports.account = function (app, controller, error, auth, middleware) {
     
    app.route("/user/account/:id").get(function (request, response) {
        try {
            controller.getUserAccountDetails(request, response);
        }
        catch (err) {
            error(err, response)
        }
    })

    app.route("/user/account").post(function (request, response) {
        try {
            controller.addUserAccountDetails(request, response);
        }
        catch (err) {
            error(err, response)
        }
    })

    app.route("/user/account").put(function (request, response) {
        try {
            controller.updateUserAccountDetails(request, response);
        }
        catch (err) {
            error(err, response)
        }
    })

    app.route("/user/change-password").put(function (request, response) {
        try {
            controller.updateUserPassword(request, response);
        }
        catch (err) {
            error(err, response)
        }
    })

    app.route("/user/add-picture").post(function (request, response) {
        try {
            controller.addUserProfilePicture(request, response);
        }
        catch (err) {
            error(err, response)
        }
    })

}