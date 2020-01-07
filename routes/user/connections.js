

exports.connections = function (app, controller, error, auth, middleware) {

    app.route("/user/get-connections").get(auth, function (request, response) {
        try {
            controller.getConnections(request, response);
        }
        catch (err) {
            error(err, response)
        }
    })

    app.route("/user/get-active-connections").get(auth, function (request, response) {
        try {
            controller.getActiveConnections(request, response);
        }
        catch (err) {
            error(err, response)
        }
    })

    app.route("/user/add-connection").post(auth, function (request, response) {
        try {
            controller.addConnection(request, response);
        }
        catch (err) {
            error(err, response)
        }
    })

    app.route("/user/delete-connection/:id").delete(auth, function (request, response) {
        try {
            controller.deleteConnection(request, response);
        }
        catch (err) {
            error(err, response)
        }
    })

    app.route("/user/update-connection").put(auth, function (request, response) {
        try {
            controller.updateConnections(request, response);
        }
        catch (err) {
            error(err, response)
        }
    })

    app.route("/user/block-connection").patch(function (request, response) {
        try {
            controller.blockConnection(request, response);
        }
        catch (err) {
            error(err, response)
        }
    })

}