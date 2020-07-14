
var mongoose = require("mongoose");
const Schema = mongoose.schema;

var chatroomSchema = new mongoose.Schema({
    name:{ type: String},
    user_id :{ type: Schema.Types.ObjectId, ref:"user"}
},
{
    timseStamps: true
}
)
exports.chatRoomSchema = mongoose.model("chatroom", chatRoomSchema);
exports.chatroom = chatroomSchema;
