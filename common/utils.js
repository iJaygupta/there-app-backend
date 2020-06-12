const responseFile = require("../lib/response");
const scheduler = require("../lib/scheduler");
const { ObjectID } = require("mongodb");

exports.sendResponse = function (response, error, statusCode, responseCode, data) {
  let output = {
    error: error,
    msg: responseFile[responseCode]["msg"],
    code: responseFile[responseCode]["code"],
  };
  if (data) {
    output.data = data;
  }
  response.status(statusCode).send(output);
};

exports.ajvErrors = function (error, callback) {
  errorField = error[0].dataPath;
  errorField = errorField.split(".");
  errorField = errorField[errorField.length - 1];
  var errMsg = errorField + " " + error[0].message;
  var displayMsg = `The provided value for ${errorField} is not valid`;
  const validationMsg = "Validation Failed For Provided Request";
  return callback(displayMsg);
};

exports.scheduleNotification = function () { };

exports.sendNotification = function () { };

exports.validateMongoId = (mongoId) => {
  if (ObjectID.isValid(mongoId)) {
    return true;
  } else {
    return false;
  }
};
