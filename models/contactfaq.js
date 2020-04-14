var mongoose = require("mongoose");

var contactfaqSchema = new mongoose.Schema({
  user: { type: String },
  faq: [
    {
      query: String
    }
  ]
});

exports.contactfaq = contactfaqSchema;
