var mongoose = require('mongoose');

var memberSchema = new mongoose.Schema({
    admin_id : {type:String},
    name: {type : String},
    designation: {type : String},
    phone_number: {type : String},
    image: {type : String}, 
    bio: {type : String},
    order : {type : Number },
    is_active :{ type: Boolean, default: false }
},
{
    timestamps : true
}
    );

    exports.teamMembers = memberSchema;