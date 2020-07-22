module.exports = {
  updateUserAccountDetails: {
    properties: {
      name: { type: ["string"] },
      email: { type: ["string"] },
      choice: { type: ["string"] },
      address: { type: ["string"] },
    },
    additionalProperties: false,
  },

  updateUserPassword: {
    properties: {
      oldPassword: { type: ["string"], minLength: 8 },
      password: { type: ["string"], minLength: 8 },
    },
    required: ["password", "oldPassword"],
    additionalProperties: false,
  },

  addUserByAdmin: {
    properties: {
      name: { type: ["string"] },
      mobile: { type: ["string"] },
      email: { type: ["string"] },
      choice: { type: ["string"] },
      address: { type: ["string"] },
    },
    required: ["mobile"],
    additionalProperties: false,
  },

  updateUserByAdmin: {
    properties: {
      name: { type: ["string"] },
      mobile: { type: ["string"] },
      email: { type: ["string"] },
      choice: { type: ["string"] },
      address: { type: ["string"] },
    },
    additionalProperties: false,
  },
};