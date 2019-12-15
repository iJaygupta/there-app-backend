var mongoose = require('mongoose');
const dbConfig = require("../dbconfig");
const Schema = mongoose.Schema;

var connectionSchema = new mongoose.Schema({
    user_id: { type: String },
    email: { type: String },
    mobile: { type: Number },
    updatedDate: { type: Date, default: new Date() },
    contact_list: [{ type: Schema.Types.ObjectId, ref: "user" }]
});



module.exports.getModel = function () {
    let connection = dbConfig.connect();
    return connection.model("connection", connectionSchema);
};



