var mongoose = require('mongoose');

var userSession = new mongoose.Schema({
    user_id : { type: String },
    access_token: { type: String },
    refresh_token: { type: String },
    token_expiry: { type: Date },
    signed_in_time: { type: Date, default: new Date() },
    is_session_active: { type: Boolean, default: true },
});

exports.userSession = userSession;





