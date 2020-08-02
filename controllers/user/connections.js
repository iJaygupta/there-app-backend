
const resPerPage = process.env.RESPONSE_PER_PAGE || 10;

exports.connections = function (utils, collection) {

    const { Connections, User } = collection;
    return {
        /**
        * Get List of Connections.
        *
        * @param {string}      page
        * @param {string}      pagination
        * @param {string}      searchKeyword search by name
        * @param {string}      is_active
        * @param {string}      orderBy 'desc' or 'asc'
        * @param {string}      sortBy
        * @param {string}      limit
        * @param {string}      skip
        *
        * @returns {array}
        */
        getConnections: async function (request, response) {
            try {
                let user_id = request.headers.payload.id;
                let limit, skip;
                let { isActive, sortBy, orderBy, searchKeyword } = request.query;
                let page = parseInt(request.query.page) || 1;

                let populateQuery = { "path": "contact_list" };

                if (!(request.query.pagination && request.query.page)) {
                    limit = parseInt(request.query.limit) || resPerPage;
                    skip = parseInt(request.query.skip) || 0;
                } else {
                    limit = resPerPage;
                    skip = (page - 1) * resPerPage
                }
                populateQuery['match'] = {};
                isActive !== undefined ? populateQuery['match']['is_active'] = isActive : "";
                searchKeyword ? populateQuery['match']["name"] = { "$regex": new RegExp(searchKeyword) } : "";

                if (sortBy && (orderBy == 'desc' || orderBy == 'asc')) {
                    populateQuery['options'] = {};
                    populateQuery['options']['sort'] = {}
                    populateQuery['options']['sort'][sortBy] = (orderBy === 'desc') ? -1 : 1;
                }
                let connectionResult = await Connections.find({ user_id: user_id }).populate(populateQuery).exec();
                if (connectionResult.length) {
                    connectionResult = connectionResult[0];
                    let result = {}
                    result['totalRecords'] = connectionResult.contact_list.length;
                    result.contact_list = connectionResult.contact_list.splice(skip, limit);
                    result['totalResults'] = result.contact_list.length;
                    if (request.query.pagination && request.query.page) {
                        result["pagination"] = {
                            "totalRecords": result['totalRecords'],
                            "totalPages": Math.ceil(result['totalRecords'] / resPerPage),
                            "currentPage": page,
                            "resPerPage": resPerPage,
                            "hasPrevPage": page > 1,
                            "hasNextPage": page < Math.ceil(result['totalRecords'] / resPerPage),
                            "previousPage": page > 1 ? page - 1 : null,
                            "nextPage": page < Math.ceil(result['totalRecords'] / resPerPage) ? page + 1 : null
                        }
                    } else {
                        result["pagination"] = false;
                        if (request.query.limit) {
                            result["limit"] = limit
                        }
                        if (request.query.skip) {
                            result["skip"] = skip
                        }
                    }
                    utils.sendResponse(response, false, 200, 4028, [result]);
                } else {
                    return utils.sendResponse(response, false, 422, 5000);
                }
            }
            catch (error) {
                utils.sendResponse(response, true, 500, 1000);
            }
        },
        /**
        * Get List of Blocked Connections.
        *
        * @param {string}      page
        * @param {string}      pagination
        * @param {string}      searchKeyword  search by name
        * @param {string}      is_active
        * @param {string}      orderBy
        * @param {string}      sortBy
        * @param {string}      limit
        * @param {string}      skip
        *
        * @returns {array}
        */
        getBlockedConnections: async function (request, response) {
            try {
                let user_id = request.headers.payload.id;
                let limit, skip;
                let { isActive, sortBy, orderBy, searchKeyword } = request.query;
                let page = parseInt(request.query.page) || 1;

                let populateQuery = { "path": "blocked_list" };

                if (!(request.query.pagination && request.query.page)) {
                    limit = parseInt(request.query.limit) || resPerPage;
                    skip = parseInt(request.query.skip) || 0;
                } else {
                    limit = resPerPage;
                    skip = (page - 1) * resPerPage
                }
                populateQuery['match'] = {};
                isActive !== undefined ? populateQuery['match']['is_active'] = isActive : "";
                searchKeyword ? populateQuery['match']["name"] = { "$regex": new RegExp(searchKeyword) } : "";

                if (sortBy && (orderBy == 'desc' || orderBy == 'asc')) {
                    populateQuery['options'] = {};
                    populateQuery['options']['sort'] = {}
                    populateQuery['options']['sort'][sortBy] = (orderBy === 'desc') ? -1 : 1;
                }
                let connectionResult = await Connections.find({ user_id: user_id }).populate(populateQuery).exec();
                if (connectionResult.length) {
                    connectionResult = connectionResult[0];
                    let result = {}
                    result['totalRecords'] = connectionResult.blocked_list.length;
                    result.blocked_list = connectionResult.blocked_list.splice(skip, limit);
                    result['totalResults'] = result.blocked_list.length;
                    if (request.query.pagination && request.query.page) {
                        result["pagination"] = {
                            "totalRecords": result['totalRecords'],
                            "totalPages": Math.ceil(result['totalRecords'] / resPerPage),
                            "currentPage": page,
                            "resPerPage": resPerPage,
                            "hasPrevPage": page > 1,
                            "hasNextPage": page < Math.ceil(result['totalRecords'] / resPerPage),
                            "previousPage": page > 1 ? page - 1 : null,
                            "nextPage": page < Math.ceil(result['totalRecords'] / resPerPage) ? page + 1 : null
                        }
                    } else {
                        result["pagination"] = false;
                        if (request.query.limit) {
                            result["limit"] = limit
                        }
                        if (request.query.skip) {
                            result["skip"] = skip
                        }
                    }
                    utils.sendResponse(response, false, 200, 4028, [result]);
                } else {
                    return utils.sendResponse(response, false, 422, 5000);
                }
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
                el['is_active'] = false;
                return {
                    updateOne: {
                        "filter": { mobile: el.mobile },
                        "update": { $setOnInsert: el },
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
                            if (invalidConnections.length) res["not_found"] = invalidConnections;
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
