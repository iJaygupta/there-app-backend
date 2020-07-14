
var mongoose = require("mongoose");
const Schema = mongoose.Schema;

var chatroomSchema = new mongoose.Schema({
    name: { type: String },
    user_id: { type: Schema.Types.ObjectId, ref: "user" },
    chat_users: [{ type: Schema.Types.ObjectId, ref: "user" }],
    filename: { type: String },
    description: { type: String },
},
    {
        timestamps: true
    }
)

exports.chatroom = chatroomSchema;
