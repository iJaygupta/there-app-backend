module.exports.schedule = function (utils, collection) {
  const { Schedule, Connections } = collection;

  return {
    getUserSchedules: async (request, response) => {
      try {
        let data = await Schedule.find({ "user_id": request.headers.payload.id });
        utils.sendResponse(response, false, 200, 4043, data);
      } catch (error) {
        utils.sendResponse(response, true, 500, 1000);
      }
    },
    getScheduleDetail: async (request, response) => {
      try {
        let validate = utils.validateMongoId(request.params.scheduleId);
        if (!validate) {
          return utils.sendResponse(response, true, 422, "MONGONODE422");
        }
        let scheduleData = await Schedule.findOne({ _id: request.params.scheduleId });
        utils.sendResponse(response, false, 200, 4049, scheduleData);
      } catch (error) {
        utils.sendResponse(response, true, 500, 1000);
      }
    },
    getUserConnectionSchedules: async (request, response) => {
      try {
        let connectionData = await Connections.aggregate([
          {
            "$match": {
              "user_id": request.headers.payload.id
            }
          },
          { "$unwind": "$contact_list" },
          {
            "$lookup": {
              "from": "schedules",
              "localField": "contact_list",
              "foreignField": "user_id",
              "as": "schedule_info"
            }
          },
        ])
        utils.sendResponse(response, false, 200, 4047, connectionData);
      } catch{
        utils.sendResponse(response, true, 500, 1000);
      }
    },
    addUserSchedule: (request, response) => {
      let user_id = request.headers.payload.id;
      request.body.user_id = user_id;
      Schedule.insertMany(request.body)
        .then((data) => {
          utils.sendResponse(response, false, 200, 4044, data);
        })
        .catch((error) => {
          utils.sendResponse(response, true, 500, 1000);
        });
    },
    updateUserSchedule: (request, response) => {
      let validate = utils.validateMongoId(request.params.scheduleId);
      if (!validate) {
        return utils.sendResponse(response, true, 422, "MONGONODE422");
      }
      Schedule.findOneAndUpdate(
        { _id: request.params.scheduleId },
        { $set: request.body },
        { new: true }
      )
        .then((data) => {
          if (data == null) {
            return utils.sendResponse(response, false, 422, 5000);
          }
          utils.sendResponse(response, false, 200, 4045, data);
        })
        .catch((error) => {
          utils.sendResponse(response, true, 500, 1000);
        });
    },
    deleteUserSchedule: (request, response) => {
      let validate = utils.validateMongoId(request.params.scheduleId);
      if (!validate) {
        return utils.sendResponse(response, true, 422, "MONGONODE422");
      }
      Schedule.findOneAndDelete({ _id: request.params.scheduleId })
        .then((data) => {
          if (data == null) {
            return utils.sendResponse(response, false, 422, 5000);
          }
          utils.sendResponse(response, false, 200, 4046, data);
        })
        .catch((error) => {
          utils.sendResponse(response, true, 500, 1000);
        });
    },
  };
};
