const modelsPath = "../schemas/models/";

module.exports = {
  auth: require(modelsPath + "auth"),
  account: require(modelsPath + "account"),
  connections: require(modelsPath + "connections"),
  status: require(modelsPath + "status"),
  common: require(modelsPath + "common"),
  schedule: require(modelsPath + "schedule"),
  setting: require(modelsPath + "setting"),
  chat: require(modelsPath + "chat")

};
