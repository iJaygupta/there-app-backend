module.exports.setting = function (utils, collection) {
  const { User } = collection;
  return {
    getAdmin: (request, response) => {
      let userId = request.headers.payload.id;
      User.findById({ _id: userId })
        .then((userData) => {
          utils.sendResponse(response, false, 200, 4060, userData);
        })
        .catch((error) => {
          utils.sendResponse(response, true, 500, 1000);
        });
    },
    addAdmin: (request, response) => {
      let userId = request.headers.payload.id;
      User.insertMany({ _id: userId })
        .then((userData) => {
          utils.sendResponse(response, false, 200, 4061, userData);
        })
        .catch((error) => {
          utils.sendResponse(response, true, 500, 1000);
        });
    },
    updateAdmin: (request, response) => {
      let userId = request.headers.payload.id;
      const options = { new: true };
      User.updateOne({ _id: userId }, { $set: request.body }, options)
        .then((success) => {
          utils.sendResponse(response, false, 200, 4062);
        })
        .catch((error) => {
          utils.sendResponse(response, true, 500, 1000);
        });
    },
    deteteAdmin: (request, response) => {
      let userId = request.headers.payload.id;
      User.delete({ _id: userId })
        .then((userData) => {
          utils.sendResponse(response, false, 200, 4063, userData);
        })
        .catch((error) => {
          utils.sendResponse(response, true, 500, 1000);
        });
    },
  };
};
