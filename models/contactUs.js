var mongoose = require('mongoose');


var ContactusSchema = new mongoose.Schema({
    user_id: { type: String },
    email: { type: String},
    fullName:{ type : String},
    phoneNumber: { type : String},
    query: { type : String}
},
    {
    timestamps : true
    }
);

exports.contactUs = ContactusSchema;    
