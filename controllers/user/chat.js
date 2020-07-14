module.exports.chat = function (utils, collection) {
    const { Chatroom } = collection;

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

        }

    }
}