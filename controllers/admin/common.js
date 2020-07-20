module.exports.common = function (utils, collection) {
    const { Queries, Common } = collection;
    return {
        getQueries: async (request, response) => {
            try{
                let queries = await Queries.find({});
                utils.sendResponse(response, false, 200, 4051, queries);
            }
            catch(error)
            {
                utils.sendResponse(response, true, 500, 1000);
            }
        },
    }
};