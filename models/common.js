var mongoose = require("mongoose");

var commonSchema = new mongoose.Schema({
  title: { type: String },
  status_messages: [{ status_id: String, msg: String }],
  updatedDate: { type: Date, default: new Date() },
  notification_messages: [{ notification_id: String, msg: String }],
  contact_us_message: [
    {
      name: String,
      address: String,
      phone_number: String
    }
  ],
  app_common_questions: [
    {
      question_id: String,
      question: String
    }
  ]
});

exports.common = commonSchema;





