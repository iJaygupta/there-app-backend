var mongoose = require('mongoose');

var status = new mongoose.Schema({
    user_id: { type: String },
    status_id: { type: Number },
    status_message: { type: String },
    status_datetime: { type: Date, default: new Date() },
    is_active: { type: Boolean, default: true },
},
{
    timestamps: true,
});


exports.statusSchema = mongoose.model("status", status);

exports.status = status;






