var mongoose = require("mongoose");

var querySchema = new mongoose.Schema({
  user_id: { type: String },
  faqs: [
    {
      query: String,
      answer: String
    }
  ]
},
{
  timestamps: true,
}
);

exports.queries = querySchema;
