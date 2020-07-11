var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var connectionSchema = new mongoose.Schema({
    user_id: { type: String },
    email: { type: String },
    mobile: { type: Number },
    updatedDate: { type: Date, default: new Date() },
    contact_list: [{ type: Schema.Types.ObjectId, ref: "user" }]
},
{
    timestamps: true,
}
);

exports.userConnections = connectionSchema;





