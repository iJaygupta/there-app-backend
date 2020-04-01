var mongoose = require('mongoose');
const Schema = mongoose.Schema;


var notification = new mongoose.Schema({
    user_id: { type: String },
    sender: { type: Schema.Types.ObjectId, ref: "user" },
    receiver: [{ type: Schema.Types.ObjectId, ref: "user" }],
    notificationMessage: { type: String },
    created_at: { type: Date },
    seen: { type: Boolean, default: false },

});

exports.notification = notification;





