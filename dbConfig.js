const mongoose = require("mongoose");
const { user } = require("./models/user");
const { status } = require("./models/status");
const { userSession } = require("./models/session");
const { userConnections } = require("./models/connections");
const { notification } = require("./models/notification");


const { DATABASE_URL = "mongodb://localhost:27017/dba_db" } = process.env;

const options = {
    useNewUrlParser: true,
    poolSize: 20,
    useUnifiedTopology: true
}


const connection = mongoose.createConnection(DATABASE_URL, options);

connection.then(() => {
    console.log('Successfully Connected with Database !!')
}).catch((error) => {
    console.log('Error in Connecting Database  !!', error.message)
    process.exit(1);
})




exports.collection = {

    User: connection.model("user", user),
    Status: connection.model("status", status),
    Session: connection.model("session", userSession),
    Connections: connection.model("connection", userConnections),
    Notification: connection.model("notification", notification)

}