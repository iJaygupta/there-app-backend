var mongoose = require('mongoose');
const dbConfig = require("../dbconfig");

var status = new mongoose.Schema({
    status_code: { type: Number },
    status_message: { type: String },
    status_datetime: { type: Date, default: new Date() },
    email: { type: String },
    name: { type: String },
    mobile: { type: Number },
    is_Active: { type: Boolean, default: true },
    availability: {
        fromDate: { type: Date },
        toDate: { type: Date }
    }
});

exports.status = status;

module.exports.getModel = function () {
    let connection = dbConfig.connect();
    return connection.model("status", status);
};



