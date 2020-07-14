var mongoose = require("mongoose");
const Schema = mongoose.schema;

var messageSchema = new mongoose.Schema({
    name:{ type: String},
    user_id :{ type:Schema.Types.ObjectId, ref:"user"},
    chatroom_id :{ type:Schema.Types.ObjectId, ref:"chatroom"},
    content:{ type :String},
    is_seen : {type: Boolean}
},
{
    timseStamps: true
}
)

exports.message = messageSchema;