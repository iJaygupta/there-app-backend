

exports.status = function (app, controller, error, auth, middleware, schema) {

    app.route("/user/get-my-status").get(auth, function (request, response) {
        try {
            controller.getMyStatus(request, response);
        }
        catch (err) {
            error(err, response)
        }
    })

    app.route("/user/get-active-status").get(auth, function (request, response) {
        try {
            controller.getActiveStatus(request, response);
        }
        catch (err) {
            error(err, response)
        }
    })

    app.route("/user/add-status").post(middleware.validateAjv(schema.status.addStatus), auth, function (request, response) {
        try {
            controller.addStatus(request, response);
        }
        catch (err) {
            error(err, response)
        }
    })

    app.route("/user/delete-status").delete(auth, function (request, response) {
        try {
            controller.deleteStatus(request, response);
        }
        catch (err) {
            error(err, response)
        }
    })

    app.route("/user/hide-status").put(auth, function (request, response) {
        try {
            controller.hideStatus(request, response);
        }
        catch (err) {
            error(err, response)
        }
    })

    app.route("/user/add-availability").post(middleware.validateAjv(schema.status.addAvailability),auth, function (request, response) {
        try {
            controller.addAvailability(request, response);
        }
        catch (err) {
            error(err, response)
        }
    })
    app.route("/user/get-status").get(auth, function (request, response){
        try {
            controller.getStatus(request, response);
        }
        catch (err) {
            error(err, response)

        }
    })

    app.route("/user/add-visibility").post(auth, function (request, response){
        try {
            controller.addVisibility(request, response);
        }
        catch (err) {
            error(err, response)

        }
    })
    
}