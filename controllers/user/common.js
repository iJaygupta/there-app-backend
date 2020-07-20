
const axios = require('axios');

module.exports.common = function (utils, collection) {
  const { Queries, Common } = collection;

  return {

     getLookupData: async (request, response) => {
      try{
      const requested_for = request.query.requested_for;
      let populate = {};
      if (requested_for) {
        populate[requested_for] = 1;
      }
        let lookupData= await Common.find({}, populate);
        utils.sendResponse(response, false, 200, 4039, lookupData);
      
      }
      catch(error){
        utils.sendResponse(response, true, 500, 1000);
      }
    },

    getCountries: async (request, response) => {
      const country_api_url = process.env.COUNTRY_API_URL;
      const requested_for = request.body.requested_for;
      const country = request.body.value || [];
      const output = [];

      try {
        var { data } = await axios(country_api_url);

        if (requested_for == 'dial_code') {
          data.map(elem => {
            let obj = {}
            if (country.includes(elem.name)) {
              obj['name'] = elem.name;
              obj['dial_code'] = elem.callingCodes;
              obj['code'] = elem.alpha2Code;
              output.push(obj);
            }
          })
          data = output;
        }

        if (!data.length) {
          return utils.sendResponse(response, false, 404, 5000);
        }

        utils.sendResponse(response, false, 200, 4042, data);
      } catch (error) {
        utils.sendResponse(response, true, 500, 1000);

      }
    },
    addQuery: async  (request, response) => {
      try{
        let user_id = request.headers.payload.id;
      let param = {
        query: request.body.query
      };
      var faqs = { $push: { "faqs": param } };
     let query = await Queries.updateOne({ user_id: user_id }, faqs, { "upsert": true })
     utils.sendResponse(response, false, 200, 4050, query);
      }
      catch(error)
      {
        utils.sendResponse(response, true, 500, 1000);
      }
    },

  };
};
