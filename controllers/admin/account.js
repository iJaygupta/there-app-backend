const resPerPage = process.env.RESPONSE_PER_PAGE || 10;
const random = require("randomstring");

module.exports.account = function (utils, collection) {

  const { User } = collection;
  return {
    getAllUsers: (request, response) => {
      let page = parseInt(request.query.page) || 1;
      let limit, skip, searchKeyword;
      let sort = {};

      if (request.query.sortBy && request.query.orderBy) {
        sort[request.query.sortBy] = request.query.orderBy === 'desc' ? -1 : 1
      }

      if (!(request.query.pagination && request.query.page)) {
        limit = parseInt(request.query.limit) || resPerPage;
        skip = parseInt(request.query.skip) || 0;
        searchKeyword = request.query.searchKeyword || "";
      } else {
        limit = resPerPage;
        skip = (page - 1) * resPerPage
      }

      let populate = {};
      if (searchKeyword) {
        populate["name"] = { "$regex": new RegExp(searchKeyword) }
      }

      let countQuery = User.count();

      User.find(populate)
        .limit(limit)
        .skip(skip)
        .sort(sort)
        .then(data => {
          countQuery.then((countData) => {
            if (data && data.length) {
              let result = {
                "items": data,
                "totalRecords": countData,
                "totalResult": data.length,
                "pagination": !(request.query.pagination && request.query.page) ? false : "",
              }
              if (request.query.pagination && request.query.page) {
                result["pagination"] = {
                  "totalRecords": countData,
                  "totalPages": Math.ceil(countData / resPerPage),
                  "currentPage": page,
                  "resPerPage": resPerPage,
                  "hasPrevPage": page > 1,
                  "hasNextPage": page < Math.ceil(countData / resPerPage),
                  "previousPage": page > 1 ? page - 1 : null,
                  "nextPage": page < Math.ceil(countData / resPerPage) ? page + 1 : null
                }
              } else {
                if (request.query.limit) {
                  result["limit"] = limit
                }
                if (request.query.skip) {
                  result["skip"] = skip
                }
              }
              utils.sendResponse(response, false, 200, 4038, result);
            } else {
              utils.sendResponse(response, false, 200, 5000);
            }
          }).catch(error => {
            console.log(error)
            return error
          })

        }).catch((error) => {
          utils.sendResponse(response, true, 500, 1000);
        })
    },

    addUserByAdmin: async (request, response) => {
      try {
        let tempPassword = random.generate(6);
        let userInfo = new User({
          ...request.body,
          password: tempPassword
        });
        userInfo = await userInfo.save();
        utils.sendResponse(response, false, 200, 4052, userInfo);
      } catch (error) {
        utils.sendResponse(response, true, 500, 1000);
      }
    },

    updateUserByAdmin: async (request, response) => {
      try {
        let userId = request.params.userId;
        let validate = utils.validateMongoId(userId);
        if (!validate) {
          return utils.sendResponse(response, true, 422, "MONGONODE422");
        }
        const options = { new: true };
        let userDetail = await User.findOneAndUpdate({ _id: userId }, { $set: request.body }, options);
        if (!userDetail) {
          return utils.sendResponse(response, false, 422, 5000);
        }
        utils.sendResponse(response, false, 200, 4053, userDetail);
      } catch (error) {
        utils.sendResponse(response, true, 500, 1000);
      }
    },
    deleteUserByAdmin: async (request, response) => {
      try {
        let userId = request.params.userId;
        let validate = utils.validateMongoId(userId);
        if (!validate) {
          return utils.sendResponse(response, true, 422, "MONGONODE422");
        }
        let userDetail = await User.findOneAndDelete({ _id: userId });
        if (!userDetail) {
          return utils.sendResponse(response, false, 422, 5000);
        }
        utils.sendResponse(response, false, 200, 4054, userDetail);
      } catch (error) {
        utils.sendResponse(response, true, 500, 1000);
      }
    },
  };
};