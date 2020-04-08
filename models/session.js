var mongoose = require('mongoose');

var userSession = new mongoose.Schema({
    user_id : { type: String },
    mobile_otp: { type: Number },
    mobile_otp_datetime: { type: Date },
    mobile: { type: Number },
    email: { type: String },
    email_otp: { type: String },
    email_otp_datetime: { type: Date },
    verification_token: { type: String },
    token_expiry: { type: Date },
    role: { type: String, default: 'user' },
    is_session_active: { type: Boolean, default: true },
});

exports.userSession = userSession;





