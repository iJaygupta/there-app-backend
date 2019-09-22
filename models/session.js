var mongoose = require('mongoose');
const dbConfig = require("../dbconfig");

var userSession = new mongoose.Schema({
    mobile_otp: { type: Number },
    mobile_otp_datetime: { type: Date },
    mobile: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    email_otp: { type: String },
    mobile_otp_datetime: { type: Date },
    registered_on: { type: Date, default: Date.now },
    verification_token: { type: String },
    token_expiry: { type: Date },
    role: { type: String, default: 'user' },
    is_session_active: { type: Boolean, default: true },
});


module.exports.getModel = function () {
    let connection = dbConfig.connect();
    return connection.model("session", userSession);
};



