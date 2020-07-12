module.exports.setting = function (utils, collection) {
  const { Setting } = collection;
  return {
    getSetting: (request, response) => {
      let userId = request.headers.payload.id;
      Setting.findById({ _id: userId })
        .then((userData) => {
          utils.sendResponse(response, false, 200, 4060, userData);
        })
        .catch((error) => {
          utils.sendResponse(response, true, 500, 1000);
        });
    },
    addSetting: (request, response) => {
      let userId = request.headers.payload.id;
      Setting.insertMany({ _id: userId })
        .then((userData) => {
          utils.sendResponse(response, false, 200, 4061, userData);
        })
        .catch((error) => {
          utils.sendResponse(response, true, 500, 1000);
        });
    },
    updateSetting: (request, response) => {
      let userId = request.headers.payload.id;
      const options = { new: true };
      Setting.updateOne({ _id: userId }, { $set: request.body }, options)
        .then((success) => {
          utils.sendResponse(response, false, 200, 4062);
        })
        .catch((error) => {
          utils.sendResponse(response, true, 500, 1000);
        });
    },
    deteteSetting: (request, response) => {
      let userId = request.headers.payload.id;
      Setting.delete({ _id: userId })
        .then((userData) => {
          utils.sendResponse(response, false, 200, 4063, userData);
        })
        .catch((error) => {
          utils.sendResponse(response, true, 500, 1000);
        });
    },
  };
};
