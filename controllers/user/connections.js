
exports.connections = function (utils, collection) {
    const { Connections, User } = collection;
    return {

        getConnections: (request, response) => {
            let user_id = request.headers.payload.id;
            Connections.find({ user_id: user_id }).populate("contact_list").exec().then((data) => {
                utils.sendResponse(response, false, 200, 4028, data);
            }).catch((error) => {
                utils.sendResponse(response, true, 500, 1000);
            })
        },

        getActiveConnections: (request, response) => {
            let user_id = request.headers.payload.id;
            User.find({ user_id: user_id, is_active: true }).then((data) => {
                utils.sendResponse(response, false, 200, 4028, data);
            }).catch((error) => {
                utils.sendResponse(response, true, 500, 1000);
            })
        },

        addConnection: function (request, response) {
            let connections = request.body;
            let id = request.headers.payload.id;

            User.insertMany(connections).then((result) => {
                let connection_ids = [];
                if (result && Array.isArray(result)) {
                    result.forEach(element => {
                        connection_ids.push(element._id);
                    });
                    let param = {
                        user_id: id,
                        contact_list: connection_ids
                    }
                    Connections.insertMany(param).then((data) => {
                        utils.sendResponse(response, false, 200, 4027);
                    })
                }
            }).catch((error) => {
                utils.sendResponse(response, true, 500, 1000);
            })
        },
        deleteConnection: (request, response) => {
            let user_id = request.headers.payload.id;
            let param = request.params.id;
            var query = {};
            query = { $pull: { "contact_list": param } };


            Connections.updateOne({ user_id: user_id }, query).then((data) => {
                utils.sendResponse(response, false, 200, 4029);
            }).catch((error) => {
                console.log(error)
                utils.sendResponse(response, true, 500, 1000);
            })
        },
        updateConnections: (request, response) => {
            Connections.updateOne().then((updated) => {
            }).catch((error) => {
            });
        },
        blockConnection: (request, response) => {
            console.log("blockConnection trig");
        }

    }

}
