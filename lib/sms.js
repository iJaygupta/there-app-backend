const twilio = require("twilio");
const client = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

exports.sendMsg = function (body, number, callback) {
    client.messages.create({
        to: number,
        from: process.env.TWILIO_SEND_NUMBER,
        body: body
    }, function (err, message) {
        if(err){
            callback(err, message);
        }else{
            callback(null, message);
        }
    })

}