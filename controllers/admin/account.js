// let User = require("../../models/user");

module.exports.account = function (utils, collection) {
  const { User } = collection;
  return {
    getAllUsers: (request, response) => {
      let limit = parseInt(request.query.limit) || 10;
      let skip = parseInt(request.query.skip) || 0;
      let sort = {};
      let searchKeyword = request.query.searchKeyword || "";
      if (request.query.sortBy && request.query.orderBy) {
        sort[request.query.sortBy] = request.query.orderBy === "desc" ? -1 : 1;
      }

      let field = request.query.field;
      let value = request.query.value;

      User.getModel()
        .find({ name: { $regex: new RegExp(searchKeyword) } })
        .limit(limit)
        .skip(skip)
        .sort(sort)
        .then((data) => {
          let userData = {
            userData: data,
            totalResults: data.length,
            limit,
            // page: 1,
            totalPages: 2,
            hasPrevPage: skip > 10 ? true : false,
            prevPage: skip > 10 ? parseInt(skip / 10) : 0,
            // nextPage: 6,
          };
          utils.sendResponse(response, false, 200, 4038, userData);
        })
        .catch((error) => {
          utils.sendResponse(response, true, 500, 1000);
        });
    },

    addUserByAdmin: (request, response) => {
      let userInfo = request.body;
      User.insertMany(userInfo)
        .then((userData) => {
          utils.sendResponse(response, false, 200, 4052, userData);
        })
        .catch((error) => {
          utils.sendResponse(response, true, 500, 1000);
        });
    },

    updateUserByAdmin: (request, response) => {
      let userId = request.headers.payload.id;
      const options = { new: true };
      User.updateOne({ _id: userId }, { $set: request.body }, options)
        .then((success) => {
          utils.sendResponse(response, false, 200, 4053, userData);
        })
        .catch((error) => {
          utils.sendResponse(response, true, 500, 1000);
        });
    },

    deleteUserByAdmin: (request, response) => {
      let userId = request.headers.payload.id;
      const options = { new: true };
      User.deleteOne({ _id: userId })
        .then((success) => {
          utils.sendResponse(response, false, 200, 4054);
        })
        .catch((error) => {
          utils.sendResponse(response, true, 500, 1000);
        });
    },
  };
};
