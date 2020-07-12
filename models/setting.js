var mongoose = require("mongoose");

var settingSchema = new mongoose.Schema({
  isEmailServiceActive: { type: Boolean },
  isSMSServiceActive: { type: Boolean },
  allowedLoggedInDevice: { type: Number },
  accessTokenValidTime: { type: Number },
  senderEmailId: { type: String },
  senderEmailPassword: { type: String },
  cronTimeInterval: { type: Number },
},
{
  timestamps: true,
});

exports.settingSchema = mongoose.model("setting", settingSchema);

exports.settingSchema = settingSchema;
