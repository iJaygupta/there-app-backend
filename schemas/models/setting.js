module.exports = {

  addSetting: {
    "properties": {
      "isEmailServiceActive": { "type": ["boolean"] },
      "isSMSServiceActive": { "type": ["boolean"] },
      "allowedLoggedInDevice": { "type": ["number"] },
      "accessTokenValidTime": { "type": ["number"] },
      "senderEmailId": { "type": ["string"] },
      "senderEmailPassword": { "type": ["string"], },
      "cronTimeInterval": { "type": ["number"] },
    },
    "additionalProperties": false
  },
  updateSetting: {
    "properties": {
      "isEmailServiceActive": { "type": ["boolean"] },
      "isSMSServiceActive": { "type": ["boolean"] },
      "allowedLoggedInDevice": { "type": ["number"] },
      "accessTokenValidTime": { "type": ["number"] },
      "senderEmailId": { "type": ["string"] },
      "senderEmailPassword": { "type": ["string"], },
      "cronTimeInterval": { "type": ["number"] },
    },
    "additionalProperties": false
  },
};
