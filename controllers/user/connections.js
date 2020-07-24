
exports.connections = function (utils, collection) {
    const { Connections, User } = collection;
    return {
        getConnections: async (request, response) => {
            try {
                let user_id = request.headers.payload.id;
                let connection = await Connections.find({ user_id: user_id }).populate("contact_list").populate("blocked_list").exec();
                utils.sendResponse(response, false, 200, 4028, connection);
            }
            catch (error) {
                utils.sendResponse(response, true, 500, 1000);
            }
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
        deleteConnection: async function (request, response) {
            try {
                let user_id = request.headers.payload.id;
                let connectionIds = request.query.connectionIds ? JSON.parse(request.query.connectionIds) : [];
                let data = await Connections.find({ user_id: user_id }, { "contact_list": 1 });
                if (data && data.length) {
                    let validConnections = [];
                    let invalidConnections = [];
                    data.map(el => {
                        connectionIds.forEach(elem => {
                            if (el.contact_list.includes(elem)) validConnections.push(elem);
                            else invalidConnections.push(elem)
                        })
                    })
                    if (validConnections.length) {
                        var query = {};
                        query = {
                            $pull: {
                                "contact_list": {
                                    $in: validConnections
                                }
                            }
                        };
                        let result = await Connections.updateOne({ user_id: user_id }, query, { multi: true });
                        if (result.ok) {
                            let res = {
                                "deleted_result": validConnections
                            }
                            if (invalidConnections.length > 0) res["not_found"] = invalidConnections;
                            utils.sendResponse(response, false, 200, 4029, res);
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
                console.log(err)
                utils.sendResponse(response, true, 500, 1000, err);
            }
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
                    });
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

        },
        unblockBlockConnection: async function (request, response) {
            try {
                let user_id = request && request.headers && request.headers.payload && request.headers.payload.id || '';
                let connectionIds = request.query.connectionIds ? JSON.parse(request.query.connectionIds) : [];
                let data = await Connections.find({ user_id: user_id }, { "blocked_list": 1 });
                if (data && data.length) {
                    let validConnections = [];
                    let invalidConnections = [];
                    data.map(el => {
                        connectionIds.forEach(elem => {
                            if (el.blocked_list.includes(elem)) {
                                validConnections.push(elem);
                            } else {
                                invalidConnections.push(elem);
                            }
                        });
                    });
                    if (validConnections.length) {
                        let query = {};
                        query = { $pull: { "blocked_list": { $in: validConnections } }, $addToSet: { "contact_list": validConnections } };
                        let result = await Connections.updateOne({ user_id: user_id }, query);
                        if (result.ok) {
                            let res = {
                                "unblocked_connections": validConnections
                            };
                            if (invalidConnections.length > 0) res["not_found"] = invalidConnections;
                            utils.sendResponse(response, false, 200, 4074, res);
                        } else utils.sendResponse(response, true, 500, 1000);
                    } else {
                        let res = {
                            "not_found": connectionIds
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
