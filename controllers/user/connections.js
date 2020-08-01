
const resPerPage = process.env.RESPONSE_PER_PAGE || 10;
exports.connections = function (utils, collection) {
    const { Connections, User } = collection;
    return {
        getConnections: async function (request, response) {
            try {
                let user_id = request.headers && request.headers.payload && request.headers.payload.id;
                let limit, skip, isActive, sortBy, orderBy, page;
                let populateQuery = { path: "contact_list" };
                if (request && request.query) {
                    isActive = request.query.is_active || null;
                    sortBy = request.query.sortBy || null;
                    orderBy = request.query.orderBy || null; // 'desc' or 'asc'
                    page = parseInt(request.query.page) || 1;
                    searchKeyword = request.query.searchKeyword || null; // search by name
                }
                if (!(request.query && request.query.pagination && request.query.page)) {
                    limit = parseInt(request.query.limit) || resPerPage;
                    skip = parseInt(request.query.skip) || 0;
                } else {
                    limit = resPerPage;
                    skip = (page - 1) * resPerPage
                }
                if (isActive) {
                    isActive = JSON.parse(isActive);
                    populateQuery['match'] = { 'is_active': isActive }
                }
                if (sortBy && (orderBy == 'desc' || orderBy == 'asc')) {
                    let order = orderBy === 'desc' ? -1 : 1;
                    populateQuery['options'] = {};
                    populateQuery['options']['sort'] = {}
                    populateQuery['options']['sort'][sortBy] = order;
                }

                await Connections.find({ user_id: user_id }).populate(populateQuery).exec((err, data) => {
                    let res = [];
                    data.map((elem, i) => {
                        let result = {}
                        result['totalRecords'] = elem.contact_list.length;
                        result.contact_list = elem.contact_list.splice(skip, limit);
                        result['totalResults'] = result.contact_list.length;
                        if (searchKeyword) {
                            let a = [];
                            result.contact_list.map(el => {
                                if (el['name'].indexOf(searchKeyword) != -1) a.push(el);
                            });
                            result.contact_list = a;
                        }
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
                        res.push(result);
                    });
                    utils.sendResponse(response, false, 200, 4028, res);
                });
            }
            catch (error) {
                utils.sendResponse(response, true, 500, 1000);
            }
        },

        getBlockedConnections: async function (request, response) {
            try {
                let user_id = request.headers && request.headers.payload && request.headers.payload.id;
                let limit, skip, isActive, sortBy, orderBy, page;
                let populateQuery = { path: "blocked_list" };
                if (request && request.query) {
                    isActive = request.query.is_active || null;
                    sortBy = request.query.sortBy || null;
                    orderBy = request.query.orderBy || null; // 'desc' or 'asc'
                    page = parseInt(request.query.page) || 1;
                    searchKeyword = request.query.searchKeyword || null; // search by name
                }
                if (!(request.query && request.query.pagination && request.query.page)) {
                    limit = parseInt(request.query.limit) || resPerPage;
                    skip = parseInt(request.query.skip) || 0;
                } else {
                    limit = resPerPage;
                    skip = (page - 1) * resPerPage
                }
                if (isActive) {
                    isActive = JSON.parse(isActive);
                    populateQuery['match'] = { 'is_active': isActive }
                }
                if (sortBy && (orderBy == 'desc' || orderBy == 'asc')) {
                    let order = orderBy === 'desc' ? -1 : 1;
                    populateQuery['options'] = {};
                    populateQuery['options']['sort'] = {}
                    populateQuery['options']['sort'][sortBy] = order;
                }

                await Connections.find({ user_id: user_id }).populate(populateQuery).exec((err, data) => {
                    let res = [];
                    data.map((elem, i) => {
                        let result = {}
                        result['totalRecords'] = elem.blocked_list.length;
                        result.blocked_list = elem.blocked_list.splice(skip, limit);
                        result['totalResults'] = result.blocked_list.length;
                        if (searchKeyword) {
                            let a = [];
                            result.blocked_list.map(el => {
                                if (el['name'].indexOf(searchKeyword) != -1) a.push(el);
                            });
                            result.blocked_list = a;
                        }
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
                        res.push(result);
                    });
                    utils.sendResponse(response, false, 200, 4028, res);
                });
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
