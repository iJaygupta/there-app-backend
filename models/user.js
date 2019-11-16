var mongoose = require('mongoose');
const dbConfig = require("../dbconfig");


var userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    city: { type: String },
    country: { type: String },
    is_email_verified: { type: Boolean, default: false },
    is_phone_verified: { type: Boolean, default: false },
    registered_on: { type: Date, default: Date.now },
    verification_token: { type: String },
    token_expiry: { type: Date },
    role: { type: String, default: 'user' },
    is_active: { type: Boolean, default: true },
    profilePic: { type: String }
});


module.exports.getModel = function () {
    let connection = dbConfig.connect();
    return connection.model("user", userSchema);
};



