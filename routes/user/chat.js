module.exports.chat = function (app, controller, error, auth, middleware, schema) {

  app.route("/user/chatroom").post(auth, function (request, response) {
    try {
      controller.createChatroom(request, response);
    } catch (err) {
      error(err, response);
    }
  });

  app.route("/user/chatroom").get(auth, function (request, response) {
    try {
      controller.getUserChatroomList(request, response);
    } catch (err) {
      error(err, response);
    }
  });

  app.route("/user/chatroom/:chatroomId").put(auth, function (request, response) {
    try {
      controller.createChatroom(request, response);
    } catch (err) {
      error(err, response);
    }
  });

  app.route("/user/chatroom/:chatroomId").delete(auth, function (request, response) {
    try {
      controller.createChatroom(request, response);
    } catch (err) {
      error(err, response);
    }
  });
}