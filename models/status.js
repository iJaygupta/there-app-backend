var mongoose = require('mongoose');
const dbConfig = require("../dbconfig");

var status = new mongoose.Schema({
    user_id: { type: String },
    status_code: { type: Number },
    status_message: { type: String },
    status_datetime: { type: Date, default: new Date() },
    is_active: { type: Boolean, default: true },
    availability: [{
        fromDate: { type: Date },
        toDate: { type: Date }
    }]
});

exports.status = status;

module.exports.getModel = function () {
    let connection = dbConfig.connect();
    return connection.model("status", status);
};




