const dbConfig = require("./dbconfig");
let connection = dbConfig.connect();
const { user } = require("./models/user");
const { status } = require("./models/status");
const { userSession } = require("./models/session");
const { userConnections } = require("./models/connections");


exports.collection = {

    User: connection.model("user", user),
    Status: connection.model("status", status),
    Session: connection.model("session", userSession),
    Connections: connection.model("connection", userConnections)
}

