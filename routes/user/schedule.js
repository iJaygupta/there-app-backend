module.exports.schedule = function (
  app,
  controller,
  error,
  auth,
  middleware,
  schema
) {
  app.route("/user/schedule").get(auth, function (request, response) {
    try {
      controller.getUserSchedules(request, response);
    } catch (err) {
      error(err, response);
    }
  });

  app
    .route("/user/schedule/:scheduleId")
    .get(auth, function (request, response) {
      try {
        controller.getScheduleDetail(request, response);
      } catch (err) {
        error(err, response);
      }
    });

  app.route("/user/connection/schedule").get(auth, function (request, response) {
    try {
      controller.getUserConnectionSchedules(request, response);
    } catch (err) {
      error(err, response);
    }
  });

  // app
  //   .route("/user/connection/:connectionId/schedule")
  //   .get(function (request, response) {
  //     try {
  //       controller.getScheduleByConnectionId(request, response);
  //     } catch (err) {
  //       error(err, response);
  //     }
  //   });

  app
    .route("/user/schedule")
    .post(
      auth,
      middleware.validateAjv(schema.schedule.addUserSchedule),
      function (request, response) {
        try {
          controller.addUserSchedule(request, response);
        } catch (err) {
          error(err, response);
        }
      }
    );

  app
    .route("/user/schedule/:scheduleId")
    .put(
      auth,
      middleware.validateAjv(schema.schedule.updateUserSchedule),
      function (request, response) {
        try {
          controller.updateUserSchedule(request, response);
        } catch (err) {
          error(err, response);
        }
      }
    );

  app
    .route("/user/schedule/:scheduleId")
    .delete(auth, function (request, response) {
      try {
        controller.deleteUserSchedule(request, response);
      } catch (err) {
        error(err, response);
      }
    });
};
