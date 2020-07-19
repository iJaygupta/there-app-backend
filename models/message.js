var mongoose = require("mongoose");
const Schema = mongoose.Schema;

var messageSchema = new mongoose.Schema({
    name: { type: String },
    user_id: { type: Schema.Types.ObjectId, ref: "user" },
    chatroom_id: { type: Schema.Types.ObjectId, ref: "chatroom" },
    content: { type: String },
    is_seen: { type: Boolean }
},
    {
        timestamps: true
    }
)

exports.message = messageSchema;