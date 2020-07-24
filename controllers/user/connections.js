
exports.connections = function (utils, collection) {
    const { Connections, User } = collection;
    return {

        getConnections: (request, response) => {
            let user_id = request.headers.payload.id;
            Connections.find({ user_id: user_id }).populate("contact_list").populate("blocked_list").exec().then((data) => {
                utils.sendResponse(response, false, 200, 4028, data);
            }).catch((error) => {
                utils.sendResponse(response, true, 500, 1000);
            })
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
            let connectionIds = request.query.connectionIds ? JSON.parse(request.query.connectionIds) : [];
            let validConnections = [];
            let invalidConnections = [];
            Connections.find({ user_id: user_id }, { "contact_list": 1 }).then((data) => {
                if (data && data.length) {
                    data.map(el => {
                        connectionIds.forEach(elem => {
                            if (el.contact_list.includes(elem)) validConnections.push(elem);
                            else invalidConnections.push(elem)
                        })
                        if (validConnections.length > 0) {
                            var query = {};
                            query = {
                                $pull: {
                                    "contact_list": {
                                        $in: validConnections
                                    }
                                }
                            };
                            Connections.updateOne({ user_id: user_id }, query, { multi: true }).then((data) => {
                                let res = {
                                    "deleted_result": validConnections
                                }
                                if (invalidConnections.length > 0) res["not_found"] = invalidConnections;
                                utils.sendResponse(response, false, 200, 4029, res);
                            }).catch((error) => {
                                utils.sendResponse(response, true, 500, 1000);
                            })
                        } else {
                            let res = {
                                "not_found": invalidConnections
                            }
                            utils.sendResponse(response, false, 422, 5000, res);
                        }
                    })
                } else {
                    let res = {
                        "not_found": connectionIds
                    }
                    utils.sendResponse(response, false, 422, 5000, res);
                }
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
                await Connections.updateOne({ user_id: user_id }, { $addToSet: { "contact_list": connectionIds } }, { "upsert": true })
                utils.sendResponse(response, false, 200, 4027, connectionResult);
            } catch (err) {
                utils.sendResponse(response, true, 500, 1000, err);
            }
        },
        blockConnection: async function (request, response) {
            try {
                let user_id = request.headers.payload.id;
                let connectionIds = request.query.connectionIds ? JSON.parse(request.query.connectionIds) : [];
                let data = await Connections.find({ user_id: user_id }, { "contact_list": 1 });
                if (data && data.length) {
                    let validConnections = [];
                    let invalidConnections = [];
                    data.map(el => {
                        connectionIds.forEach(elem => {
                            if (el.contact_list.includes(elem)) {
                                validConnections.push(elem);
                            } else {
                                invalidConnections.push(elem);
                            }
                        });
                    })
                    if (validConnections.length) {
                        var query = {};
                        query = { $pull: { "contact_list": { $in: validConnections } }, $addToSet: { "blocked_list": validConnections } };
                        let result = await Connections.updateOne({ user_id: user_id }, query);
                        if (result.ok) {
                            let res = {
                                "blocked_connections": validConnections
                            }
                            if (invalidConnections.length > 0) res["not_found"] = invalidConnections;
                            utils.sendResponse(response, false, 200, 4073, res);
                        } else utils.sendResponse(response, true, 500, 1000);
                    } else {
                        let res = {
                            "not_found": invalidConnections
                        }
                        utils.sendResponse(response, false, 422, 5000, res);
                    }
                } else {
                    let res = {
                        "not_found": connectionIds
                    }
                    utils.sendResponse(response, false, 422, 5000, res);
                }
            } catch (err) {
                utils.sendResponse(response, true, 500, 1000, err);
            }

        }

    }

}
