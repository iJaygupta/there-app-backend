var mongoose = require('mongoose');

var status = new mongoose.Schema({
    user_id: { type: String },
    status_code: { type: Number },
    status_message: { type: String },
    status_datetime: { type: Date, default: new Date() },
    is_active: { type: Boolean, default: true },
    availability: [{
        fromDate: { type: Date },
        toDate: { type: Date }
    }],
    availability_message: { type: String }
});

exports.status = status;






