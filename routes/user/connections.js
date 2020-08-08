

exports.connections = function (app, controller, error, auth, middleware) {

    app.route("/user/connections").get(auth, function (request, response) {
        try {
            controller.getConnections(request, response);
        }
        catch (err) {
            error(err, response)
        }
    })

    app.route("/user/connections/block").get(auth, function (request, response) {
        try {
            controller.getBlockedConnections(request, response);
        }
        catch (err) {
            error(err, response)
        }
    })

    app.route("/user/connections").post(auth, function (request, response) {
        try {
            controller.addConnection(request, response);
        }
        catch (err) {
            error(err, response)
        }
    })

    app.route("/user/connections").delete(auth, function (request, response) {
        try {
            controller.deleteConnection(request, response);
        }
        catch (err) {
            error(err, response)
        }
    })

    app.route("/user/connections").put(auth, function (request, response) {
        try {
            controller.updateConnections(request, response);
        }
        catch (err) {
            error(err, response)
        }
    })

    app.route("/user/connections/block").patch(auth, function (request, response) {
        try {
            controller.blockConnection(request, response);
        }
        catch (err) {
            error(err, response)
        }
    })

    app.route("/user/connections/unblock").patch(auth, function (request, response) {
        try {
            controller.unblockBlockConnection(request, response);
        }
        catch (err) {
            error(err, response)
        }
    })

}