
var mongoose = require('mongoose');

var ContactusSchema = new mongoose.Schema({
    email: { type: String },
    fullName: { type: String },
    phoneNumber: { type: String },
    query: { type: String }
},
    {
        timestamps: true
    }
);

exports.contactus = ContactusSchema;    
