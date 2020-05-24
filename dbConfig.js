const mongoose = require("mongoose");
const { user } = require("./models/user");
const { status } = require("./models/status");
const { userOtp } = require("./models/otp");
const { userSession } = require("./models/session");
const { userConnections } = require("./models/connections");
const { notification } = require("./models/notification");
const { common } = require("./models/common");
const { activity } = require("./models/activity");
const { queries } = require("./models/queries");

const { DATABASE_URL } = process.env;

const options = {
  useNewUrlParser: true,
  poolSize: 20,
  useUnifiedTopology: true
};

const connection = mongoose.createConnection(DATABASE_URL, options);

connection
  .then(() => {
    console.log("Successfully Connected with Database !!");
  })
  .catch(error => {
    console.log("Error in Connecting Database  !!", error.message);
    process.exit(1);
  });



exports.collection = {
  User: connection.model("user", user),
  Status: connection.model("status", status),
  Session: connection.model("sessions", userSession),
  Otp: connection.model("otp", userOtp),
  Connections: connection.model("connection", userConnections),
  Notification: connection.model("notification", notification),
  Common: connection.model("commons", common),
  Activity: connection.model("activity", activity),
  Queries: connection.model("queries", queries)
};


