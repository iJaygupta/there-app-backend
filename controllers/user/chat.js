module.exports.chat = function (utils, collection) {
    const { Chatroom } = collection;

    return {
        createChatroom: async (request, response) => {
            try {
                let userId = request.headers.payload.id;
                const name = request.body;

                const nameRegex = /^[A-Za-z\s]+$/ //albhabetic check
                if (!nameRegex.test(name)) throw "chatroom contain only alphabets"

                const chatroomExists = await chatroom.findOne({ name })

                if (!chatroomExists) throw "chatroom with this name already exists"
                const chatroom = new Chatroom({
                    name,
                });
                await chatroom.save();
                utils.sendResponse(response, false, 200, 4008);
            } catch (err) {
                utils.sendResponse(response, true, 500, 1000, err);
                console.log(err);

            }

        }

    }
}