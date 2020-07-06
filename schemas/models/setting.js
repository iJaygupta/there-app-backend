module.exports = {
  addSetting: {
    properties: {
      name: { type: String },
      address: { type: String },
      mobile: { type: String },
      alt_name: { type: String },
      profile_id: { type: String },
      password: { type: String },
      email: { type: String },
    },
    additionalProperties: false,
  },
  updateSetting: {
    properties: {
      name: { type: String },
      address: { type: String },
      mobile: { type: String },
      alt_name: { type: String },
      profile_id: { type: String },
      password: { type: String },
      email: { type: String },
    },
    additionalProperties: false,
  },
};
