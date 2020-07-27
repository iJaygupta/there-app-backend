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
const { schedule } = require("./models/schedule");
const { setting } = require("./models/setting");
const { message } = require("./models/message");
const { chatroom } = require("./models/chatroom");
const {contactUs} = require("./models/contactUs");
const {teamMembers} = require("./models/teamMembers")

const { DATABASE_URL } = process.env;

const options = {
  useNewUrlParser: true,
  poolSize: 20,
  useUnifiedTopology: true,
};

const connection = mongoose.createConnection(DATABASE_URL, options);

connection
  .then(() => {
    console.log("Successfully Connected with Database !!");
  })
  .catch((error) => {
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
  Queries: connection.model("queries", queries),
  Schedule: connection.model("schedule", schedule),
  Setting: connection.model("setting", setting),
  Message: connection.model("message", message),
  Chatroom: connection.model("chatroom", chatroom),
  Contactus: connection.model("contactus",contactUs),
  TeamMembers: connection.model("teamMembers",teamMembers),

};
