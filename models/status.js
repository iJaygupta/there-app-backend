var mongoose = require('mongoose');
const dbConfig = require("../dbconfig");

var status = new mongoose.Schema({
    status_code: { type: Number },
    status_datetime: { type: Date, default: new Date() },
    email: { type: String },
    status_message: { type: String },
    email: { type: String },
    is_Active: { type: Boolean, default: true },
    availability: {
        fromDate: { type: Date },
        toDate: { type: Date }
    }
});


module.exports.getModel = function () {
    let connection = dbConfig.connect();
    return connection.model("status", status);
};




