module.exports.schedule = function (utils, collection) {
  const { Schedule } = collection;

  return {
    getUserSchedules: (request, response) => {
      Schedule.find()
        .then((data) => {
          utils.sendResponse(response, false, 200, 4043, data);
        })
        .catch((error) => {
          utils.sendResponse(response, true, 500, 1000);
        });
    },
    getScheduleDetail: (request, response) => {
      let validate = utils.validateMongoId(request.params.scheduleId);
      if (!validate) {
        return utils.sendResponse(response, true, 422, "MONGONODE422");
      }
      Schedule.findOne({ _id: request.params.scheduleId })
        .then((data) => {
          utils.sendResponse(response, false, 200, 4049, data);
        })
        .catch((error) => {
          utils.sendResponse(response, true, 500, 1000);
        });
    },
    // getUserConnectionSchedules: (request, response) => {
    //   Schedule.find()
    //     .then((data) => {
    //       utils.sendResponse(response, false, 200, 4047, data);
    //     })
    //     .catch((error) => {
    //       utils.sendResponse(response, true, 500, 1000);
    //     });
    // },
    addUserSchedule: (request, response) => {
      let user_id = request.headers.payload.id;
      request.body.user_id = user_id;
      Schedule.insertMany(request.body)
        .then((data) => {
          utils.sendResponse(response, false, 200, 4044, data);
        })
        .catch((error) => {
          console.log(error);
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
          console.log(data);
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
