module.exports = {

  updateUserPassword: {
    "type": ["object"],
    "properties": {
      "oldPassword": { "type": ["string"], "minLength": 8 },
      "password": { "type": ["string"], "minLength": 8 },
    },
    "required": ["password", "oldPassword"],
    "additionalProperties": false
  },
  addUserAccountDetails: {
    "type": ["object"],
    "properties": {
      "email": { "type": ["string"] },
      "name": { "type": ["string"] },
      "mobile": { "type": ["string"], "maxLength": 12, "minLength": 12 }
    },
    "additionalProperties": false
  },
  updateUserAccountDetails: {
    "type": ["object"],
    "properties": {
      "name": { "type": ["string"] },
      "email": { "type": ["string"] },
      "mobile": { "type": ["string"], "maxLength": 12, "minLength": 12 }
    },
    "additionalProperties": false
  },

}
