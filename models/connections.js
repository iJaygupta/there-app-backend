var mongoose = require('mongoose');
const dbConfig = require("../dbconfig");
const { status } = require("./status");

var connectionSchema = new mongoose.Schema({
    email: { type: String, required: true },
    mobile: { type: Number },
    updatedDate: { type: Date, default: new Date() },
    contacts_list: status
});



module.exports.getModel = function () {
    let connection = dbConfig.connect();
    return connection.model("connection", connectionSchema);
};



