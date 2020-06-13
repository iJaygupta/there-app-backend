module.exports = {
  addUserSchedule: {
    properties: {
      meeting_time: { type: ["object"] },
      work_timing: { type: ["object"] },
      user_type: { type: ["string"] },
      sleeping_time: { type: ["object"] },
      weekly_holiday: { type: ["string", "array"] },
      is_mood_off: { type: ["boolean"] },
    },
    additionalProperties: false,
  },
  updateUserSchedule: {
    properties: {
      meeting_time: { type: ["object"] },
      work_timing: { type: ["object"] },
      user_type: { type: ["string"] },
      sleeping_time: { type: ["object"] },
      weekly_holiday: { type: ["string", "array"] },
      is_mood_off: { type: ["boolean"] },
    },
    additionalProperties: false,
  },
};
