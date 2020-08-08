module.exports.setting = function (utils, collection) {
  const { Setting } = collection;
  return {
    getSetting: async (request, response) => {
      try {
        let setting = await Setting.find({});
        utils.sendResponse(response, false, 200, 4060, setting);
      } catch (error) {
        utils.sendResponse(response, true, 500, 1000);
      }
    },
    addSetting: async (request, response) => {
      try {
        let user_id = request.headers.payload.id;
        let setting = new Setting({
          user_id,
          ...request.body
        });
        setting = await setting.save();
        utils.sendResponse(response, false, 200, 4061, setting);
      } catch (error) {
        utils.sendResponse(response, true, 500, 1000);
      }
    },
    updateSetting: async (request, response) => {
      try {
        let settingId = request.params.settingId;
        let validate = utils.validateMongoId(settingId);
        if (!validate) {
          return utils.sendResponse(response, true, 422, "MONGONODE422");
        }
        const options = { new: true };
        let setting = await Setting.findOneAndUpdate({ _id: settingId }, { $set: request.body }, options);
        if (!setting) {
          return utils.sendResponse(response, false, 422, 5000);
        }
        utils.sendResponse(response, false, 200, 4062, setting);
      } catch (error) {
        utils.sendResponse(response, true, 500, 1000);
      }

    },
    deteteSetting: async (request, response) => {
      try {
        let settingId = request.params.settingId;
        let validate = utils.validateMongoId(settingId);
        if (!validate) {
          return utils.sendResponse(response, true, 422, "MONGONODE422");
        }
        let setting = await Setting.findOneAndDelete({ _id: settingId });
        if (!setting) {
          return utils.sendResponse(response, false, 422, 5000);
        }
        utils.sendResponse(response, false, 200, 4063, setting);
      } catch (error) {
        utils.sendResponse(response, true, 500, 1000);
      }
    },
  };
};
