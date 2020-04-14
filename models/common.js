var mongoose = require("mongoose");

var commonSchema = mongoose.Schema({
  title: { type: String },
  status_messages: [
    {
      status_id: String,
      msg: String
    }
  ],
  updatedDate: {
    type: Date, default: new Date()
  },
  contact_details:
  {
    name: String,
    address: String,
    phone_number: String
  },
  common_questions: [
    {
      question_id: String,
      question: String
    }
  ],
  notification_messages: [
    {
      notification_id: String,
      msg: String
    }
  ],
});

exports.common = commonSchema;





