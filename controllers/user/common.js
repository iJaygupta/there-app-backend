

module.exports.common = function (utils, collection) {
  const { Queries, Common } = collection;

  return {
    getLookupData: (request, response) => {

      const requested_for = request.query.requested_for;
      let populate = {};
      if (requested_for) {
        populate[requested_for] = 1;
      }

      Common.find({}, populate)
        .then(result => {
          utils.sendResponse(response, false, 200, 4039, result);
        })
        .catch(error => {
          utils.sendResponse(response, true, 500, 1000);
        });
    }
  };
};
