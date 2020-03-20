let User = require('../../models/user');

module.exports.account = function (utils) {
    return {
        getAllUsers: (request, response) => {
            let limit = parseInt(request.query.limit) || 10;
            let skip = parseInt(request.query.skip) || 0;
            let sort = {};
            let searchKeyword = request.query.searchKeyword || "";
            if (request.query.sortBy && request.query.orderBy) {
                sort[request.query.sortBy] = request.query.orderBy === 'desc' ? -1 : 1
            }

            let field = request.query.field;
            let value = request.query.value;

            User.getModel().find({ name: { "$regex": new RegExp(searchKeyword) } })
                .limit(limit)
                .skip(skip)
                .sort(sort)
                .then(data => {
                    let userData = {
                        userData: data,
                        totalResults: data.length,
                        limit,
                        // page: 1,
                        totalPages: 2,
                        hasPrevPage: skip > 10 ? true : false,
                        prevPage: skip > 10 ? parseInt(skip / 10) : 0,
                        // nextPage: 6,
                    }
                    utils.sendResponse(response, false, 200, 4038, userData);
                }).catch((error) => {
                    utils.sendResponse(response, true, 500, 1000);
                });

        },
    }
}