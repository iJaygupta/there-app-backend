module.exports.common = function (utils, collection) {
    const { Queries, Common } = collection;
  
    return {
        getQueries: (request, response) => {
            let user_id = request.headers.payload.id;
            let param = {
                created_at: request.body.created_at,
                updated_at: request.body.updated_at
            };
            var faqs= { $push: [{ "query": param }] };
      
           Queries.find({ user_id: user_id }, faqs,  { "upsert": true }).then((data) => {
              const queryCreated = request.body.created_at;
              utils.sendResponse(response, false, 200, 4043);
          }).catch((error) => {
              utils.sendResponse(response, true, 500, 1000);
              console.log(error);
          })
      
        },

    }
};