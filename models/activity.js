var mongoose = require('mongoose');
const Schema = mongoose.Schema;


var activitySchema = new mongoose.Schema({
    user_id: { type: String },
    status_id: { type: Number },
    status_message: { type: String },
    status_datetime: { type: Date, default: new Date() },
    availability_message_id: { type: Number },
    availability_message: { type: String },
    availability_message_datetime: { type: Date, default: new Date() },
    availability: [{
        fromDate: { type: Date },
        toDate: { type: Date }
    }],
    status_visible_to: [{ type: Schema.Types.ObjectId, ref: "user" }],
    availability_visible_to: [{ type: Schema.Types.ObjectId, ref: "user" }],

});

exports.activity = activitySchema;






