module.exports.chat = function (utils, collection) {
  const { Chatroom, Message } = collection;

  return {
    createChatroom: async (request, response) => {
      try {
        let user_id = request.headers.payload.id;
        const { name, description } = request.body;
        const nameRegex = /^[A-Za-z\s]+$/ //albhabetic check
        if (!nameRegex.test(name)) {
          let output = "Chatroom should contain only alphabets"
          return utils.sendResponse(response, false, 422, 2000, output);
        }
        const chatroomExists = await Chatroom.findOne({ user_id, name });
        if (chatroomExists) {
          let output = "Chatroom with this name already exists"
          return utils.sendResponse(response, false, 422, 2000, output);
        }
        let chatroom = new Chatroom({
          user_id,
          name,
          chat_users: [user_id],
          description
        });
        chatroom = await chatroom.save();
        utils.sendResponse(response, false, 200, 4064, chatroom);
      } catch (err) {
        utils.sendResponse(response, true, 500, 1000, err);
      }
    },
    getUserChatroomList: async (request, response) => {
      try {
        let user_id = request.headers.payload.id;
        const chatroom = await Chatroom.find({ user_id });
        utils.sendResponse(response, false, 200, 4065, chatroom);
      } catch (err) {
        utils.sendResponse(response, true, 500, 1000, err);
      }

    },
    updateChatroom: async (request, response) => {
      try {
        let chatroomId = request.params.chatroomId;
        let validate = utils.validateMongoId(chatroomId);
        if (!validate) {
          return utils.sendResponse(response, true, 422, "MONGONODE422");
        }
        const options = { new: true };
        let chatroom = await Chatroom.findOneAndUpdate({ _id: chatroomId }, { $set: request.body }, options);
        if (!chatroom) {
          return utils.sendResponse(response, false, 422, 5000);
        }
        utils.sendResponse(response, false, 200, 4066, chatroom);
      } catch (error) {
        utils.sendResponse(response, true, 500, 1000);
      }

    },
    deleteChatroom: async (request, response) => {
      try {
        let chatroomId = request.params.chatroomId;
        let validate = utils.validateMongoId(chatroomId);
        if (!validate) {
          return utils.sendResponse(response, true, 422, "MONGONODE422");
        }
        let chatroom = await Chatroom.findOneAndDelete({ _id: chatroomId });
        if (!chatroom) {
          return utils.sendResponse(response, false, 422, 5000);
        }
        utils.sendResponse(response, false, 200, 4067, chatroom);
      } catch (error) {
        utils.sendResponse(response, true, 500, 1000);
      }
    },
    joinChatroom: async (request, response) => {
      try {
        let user_id = request.headers.payload.id;
        let chatroomId = request.params.chatroomId;
        let chatroom = await Chatroom.updateOne({ _id: chatroomId }, { $push: { "chat_users": user_id } }, { "upsert": true })
        utils.sendResponse(response, false, 200, 4072, chatroom);
      } catch (error) {
        utils.sendResponse(response, true, 500, 1000);
      }

    },
    getMessgae: async (request, response) => {
      try {
        let message = await Message.find({});
        utils.sendResponse(response, false, 200, 4068, message);
      } catch (error) {
        utils.sendResponse(response, true, 500, 1000);
      }
    },
    addMessage: async (request, response) => {
      try {
        let user_id = request.headers.payload.id;
        let message = new Message({
          user_id,
          ...request.body
        });
        message = await message.save();
        utils.sendResponse(response, false, 200, 4069, message);
      } catch (error) {
        utils.sendResponse(response, true, 500, 1000);
      }
    },
    updateMessage: async (request, response) => {
      try {
        let messageId = request.params.messageId;
        let validate = utils.validateMongoId(messageId);
        if (!validate) {
          return utils.sendResponse(response, true, 422, "MONGONODE422");
        }
        const options = { new: true };
        let message = await Message.findOneAndUpdate({ _id: messageId }, { $set: request.body }, options);
        if (!message) {
          return utils.sendResponse(response, false, 422, 5000);
        }
        utils.sendResponse(response, false, 200, 4070, message);
      } catch (error) {
        utils.sendResponse(response, true, 500, 1000);
      }

    },
    deteteMessage: async (request, response) => {
      try {
        let messageId = request.params.messageId;
        let validate = utils.validateMongoId(messageId);
        if (!validate) {
          return utils.sendResponse(response, true, 422, "MONGONODE422");
        }
        let message = await Message.findOneAndDelete({ _id: messageId });
        if (!message) {
          return utils.sendResponse(response, false, 422, 5000);
        }
        utils.sendResponse(response, false, 200, 4071, message);
      } catch (error) {
        utils.sendResponse(response, true, 500, 1000);
      }
    },

  }
}