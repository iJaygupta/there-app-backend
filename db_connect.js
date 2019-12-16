const dbConfig = require("./dbconfig");
let connection = dbConfig.connect();
const { user } = require("./models/user");
const { status } = require("./models/status");


exports.db = "db";

exports.collection = {

    User: connection.model("user", user),
    Status: connection.model("status", status)
}


console.log(exports.collection.User)


