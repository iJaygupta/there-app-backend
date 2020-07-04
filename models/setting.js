var mongoose = require("mongoose");

var adminSchema = new mongoose.Schema({
  name: { type: String },
  choice: { type: String },
  address: { type: String },
  mobile: { type: String },
  alt_name: { type: String },
  profile_id: { type: String },
  password: { type: String },
  email: { type: String },
});

exports.adminSchema = mongoose.model("admin", adminSchema);

exports.adminSchema = adminSchema;
