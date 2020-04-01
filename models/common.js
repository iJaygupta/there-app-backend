var mongoose = require('mongoose');

var commonSchema = new mongoose.Schema({
    email: { type: String },
    // status_messages: [{ status_id: 601, msg: "Available" }, { status_id: 602, msg: "Busy" }, { status_id: 603, msg: "Can't Talk Text Only" }, { status_id: 604, msg: "In a Meeting" }, { status_id: 605, msg: "In Shopping" }, { status_id: 606, msg: "In Washroom" }, { status_id: 607, msg: "In Office" }, { status_id: 608, msg: "Travelling" }, { status_id: 609, msg: "With Family" }, { status_id: 610, msg: "On a Date" }, { status_id: 611, msg: "Having Meal" }],
    updatedDate: { type: Date, default: new Date() },
    notification_messages: [{type : Object.values({ ntification_id: 601, msg: "Ready to take calls" })}],
    contact_us_message: [{ name: "There", address: "Aya Nagar ,New Delhi , 110047" }]

});

exports.common = commonSchema;





