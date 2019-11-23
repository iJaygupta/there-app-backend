

exports.status = function (app, controller, error, auth, middleware) {

    app.route("/user/get-status").get(auth, function (request, response) {
        try {
            controller.getStatus(request, response);
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

    app.route("/user/add-status").post(auth, function (request, response) {
        try {
            controller.addStatus(request, response);
        }
        catch (err) {
            error(err, response)
        }
    })

    app.route("/user/update-status").put(function (request, response) {
        try {
            controller.updateStatus(request, response);
        }
        catch (err) {
            error(err, response)
        }
    })

    app.route("/user/delete-status/:id").delete(function (request, response) {
        try {
            controller.deleteStatus(request, response);
        }
        catch (err) {
            error(err, response)
        }
    })

    app.route("/user/hide-status").patch(function (request, response) {
        try {
            controller.hideStatus(request, response);
        }
        catch (err) {
            error(err, response)
        }
    })

<<<<<<< HEAD
=======
    app.route("/user/add-availability").post(auth, function (request, response) {
        try {
            controller.addAvailability(request, response);
        }
        catch (err) {
            error(err, response)
        }
    })
>>>>>>> master
}