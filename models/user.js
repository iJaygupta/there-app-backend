var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    name: { type: String },
    mobile: { type: String },
    alt_name: { type: String },
    profile_id: { type: String },
    password: { type: String },
    email: { type: String },
    city: { type: String },
    country: { type: String },
    is_email_verified: { type: Boolean, default: false },
    is_phone_verified: { type: Boolean, default: false },
    registered_on: { type: Date, default: Date.now },
    verification_token: { type: String },
    token_expiry: { type: Date },
    role: { type: String, default: 'user' },
    is_active: { type: Boolean, default: false },
    profilePic: { type: String },
});

exports.userSchema = mongoose.model("user", userSchema);



exports.user = userSchema;












