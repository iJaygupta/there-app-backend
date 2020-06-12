module.exports.common = function (utils, collection) {
    const { Queries, Common } = collection;
    return {
        getQueries: (request, response) => {
            Queries.find({}).then((data) => {
                utils.sendResponse(response, false, 200, 4043, data);
            }).catch((error) => {
                utils.sendResponse(response, true, 500, 1000);
            })
        },
    }
};