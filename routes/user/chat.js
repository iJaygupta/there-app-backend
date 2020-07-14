module.exports.chat = function (app, controller, error, auth, middleware, schema) {


    app.route("/user/chatroom").post(auth, function (request, response) {
      try {
        controller.createChatroom(request, response);
      } catch (err) {
        error(err, response);
      }
    });
    }