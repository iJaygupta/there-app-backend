module.exports.chat = function (app, controller, error, auth, middleware, schema) {

  app.route("/user/chatroom").post(auth, middleware.validateAjv(schema.chat.createChatroom), function (request, response) {
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

  app.route("/user/chatroom/:chatroomId").put(auth, middleware.validateAjv(schema.chat.updateChatroom), function (request, response) {
    try {
      controller.updateChatroom(request, response);
    } catch (err) {
      error(err, response);
    }
  });

  app.route("/user/chatroom/:chatroomId").delete(auth, function (request, response) {
    try {
      controller.deleteChatroom(request, response);
    } catch (err) {
      error(err, response);
    }
  });

  app.route("/user/chatroom/:chatroomId").patch(auth, function (request, response) {
    try {
      controller.joinChatroom(request, response);
    } catch (err) {
      error(err, response);
    }
  });

  app.route("/user/message").get(auth, function (request, response) {
    try {
      controller.getMessgae(request, response);
    } catch (err) {
      error(err, response);
    }
  });

  app.route("/user/message").post(auth, middleware.validateAjv(schema.chat.addMessage), function (request, response) {
    try {
      controller.addMessage(request, response);
    } catch (err) {
      error(err, response);
    }
  });

  app.route("/user/message/:messageId").put(auth, middleware.validateAjv(schema.chat.updateMessage), function (request, response) {
    try {
      controller.updateMessage(request, response);
    } catch (err) {
      error(err, response);
    }
  });

  app.route("/user/message/:messageId").delete(auth, function (request, response) {
    try {
      controller.deteteMessage(request, response);
    } catch (err) {
      error(err, response);
    }
  });


}