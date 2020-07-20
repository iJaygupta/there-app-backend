
exports.connections = function (utils, collection) {
    const { Connections, User } = collection;
    return {

        getConnections: async (request, response) => {
            try{
            let user_id = request.headers.payload.id;
           let connection = await Connections.find({ user_id: user_id }).populate("contact_list").exec();
                utils.sendResponse(response, false, 200, 4028, connection);
        }
           catch(error){ 
                utils.sendResponse(response, true, 500, 1000);
            }
        },

       
        getActiveConnections: (request, response) => {
            let user_id = request.headers.payload.id;
            User.find({ user_id: user_id, is_active: true }).then((data) => {
                utils.sendResponse(response, false, 200, 4022, data);
            }).catch((error) => {
                utils.sendResponse(response, true, 500, 1000);
            })
        },

        addConnection: async function (request, response) {
            try {
                let connections = request.body;
                let user_id = request.headers.payload.id;
                let bulWriteQuery = this.prepareQueryForUpdateUserConnections(connections);
                await User.bulkWrite(bulWriteQuery);
                let userMobiles = [];
                connections.forEach(element => {
                    userMobiles.push(element.mobile);
                });
                let connectionResult = await User.find({ "mobile": { "$in": userMobiles } }, { _id: 1 });
                let connectionIds = [];
                connectionResult.forEach(element => {
                    connectionIds.push(element._id);
                });
                let connectionParam = {
                    user_id: user_id,
                    contact_list: connectionIds
                }
                await Connections.updateOne({ user_id: user_id }, { $set: connectionParam }, { "upsert": true })
                utils.sendResponse(response, false, 200, 4027, connectionResult);
            } catch (err) {
                utils.sendResponse(response, true, 500, 1000, err);
            }
        },
        prepareQueryForUpdateUserConnections: function (connections) {
            let bulkWriteConnectionQuery = [];
            bulkWriteConnectionQuery = connections.map((el, index) => {
                return {
                    updateOne: {
                        "filter": { mobile: el.mobile },
                        "update": { $set: el },
                        "upsert": true
                    }
                }
            })
            return bulkWriteConnectionQuery;
        },
        deleteConnection: (request, response) => {
            let user_id = request.headers.payload.id;
            let param = request.params.id;
            var query = {};
            query = { $pull: { "contact_list": param } };
            Connections.updateOne({ user_id: user_id }, query).then((data) => {
                utils.sendResponse(response, false, 200, 4029);
            }).catch((error) => {
                utils.sendResponse(response, true, 500, 1000);
            })
        },
        updateConnections: async function (request, response) {
            try {
                let connections = request.body;
                let user_id = request.headers.payload.id;
                let bulWriteQuery = this.prepareQueryForUpdateUserConnections(connections);
                await User.bulkWrite(bulWriteQuery);
                let userMobiles = [];
                connections.forEach(element => {
                    userMobiles.push(element.mobile);
                });
                let connectionResult = await User.find({ "mobile": { "$in": userMobiles } }, { _id: 1 });
                let connectionIds = [];
                connectionResult.forEach(element => {
                    connectionIds.push(element._id);
                });
                await Connections.updateOne({ user_id: user_id }, { $push: { "contact_list": connectionIds } }, { "upsert": true })
                utils.sendResponse(response, false, 200, 4027, connectionResult);
            } catch (err) {
                utils.sendResponse(response, true, 500, 1000, err);
            }
        },
        blockConnection: (request, response) => {
            console.log("blockConnection trig");
        }

    }

}
