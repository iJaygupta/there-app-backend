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

  // updateUser: {
  //   properties: {
  //     name: { type: ["string"] },
  //     email: { type: ["string"] },
  //     choice: { type: ["string"] },
  //     address: { type: ["string"] },
  //   },
  //   additionalProperties: false,
  // },

  updateUserByAdmin: {
    properties: {
      name: { type: ["string"] },
      email: { type: ["string"] },
      choice: { type: ["string"] },
      address: { type: ["string"] },
    },
    additionalProperties: false,
  },
};
