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
  app.route("/user/chatroom/:chatroomId").post(auth, function (request, response) {
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
  app.route("/user/message").post(auth, function (request, response) {
    try {
      controller.addMessage(request, response);
    } catch (err) {
      error(err, response);
    }
  });
  app.route("/user/message/:messageId").put(auth, function (request, response) {
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