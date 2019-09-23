var mongoose = require('mongoose');
const dbConfig = require("../dbconfig");
const Session =require("../models/session");


var userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    mobile: { type: Number, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    city: { type: String },
    country: { type: String },
    is_email_verified: { type: Boolean, default: false },
    is_phone_verified: { type: Boolean, default: false },
    registered_on: { type: Date, default: Date.now },
    verification_token: { type: String },
    token_expiry: { type: Date },
    session: Session,
    role: { type: String, default: 'user' },
    is_active: { type: Boolean, default: true },
});


module.exports.getModel = function () {
    let connection = dbConfig.connect();
    return connection.model("user", userSchema);
};



