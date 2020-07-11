var mongoose = require("mongoose");

var settingSchema = new mongoose.Schema({
  name: { type: String },
  choice: { type: String },
  address: { type: String },
  mobile: { type: String },
  alt_name: { type: String },
  profile_id: { type: String },
  password: { type: String },
  email: { type: String },
},
{
  timestamps: true,
});

exports.settingSchema = mongoose.model("setting", settingSchema);

exports.settingSchema = settingSchema;
