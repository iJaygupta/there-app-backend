var mongoose = require('mongoose');
const Schema = mongoose.Schema;


var notification = new mongoose.Schema({
    user_id: { type: Schema.Types.ObjectId, ref: "user" },
    receiver: [{ type: Schema.Types.ObjectId, ref: "user" }],
    content: { type: String },
    sent_date_time: { type: Date, default: new Date() },
    seen: { type: Boolean, default: false },

},
{
    timestamps: true,
}
);

exports.notification = notification;
