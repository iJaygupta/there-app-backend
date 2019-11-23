var mongoose = require('mongoose');
const dbConfig = require("../dbconfig");

var contacts = new mongoose.Schema({
    email: { type: String, required: true },
    mobile : { type: Number },
    updatedDate: { type: Date, default: new Date() },
    contacts_list: [{
        name: String,
        mobile: Number,
        email: String,
        isAvailable: { type: Boolean, default: true },
    }]
});


module.exports.getModel = function () {
    let connection = dbConfig.connect();
    return connection.model("contact", contacts);
};



