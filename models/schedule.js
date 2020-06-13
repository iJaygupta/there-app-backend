var mongoose = require("mongoose");

var scheduleSchema = new mongoose.Schema({
  user_id: { type: String },
  meeting_time: [
    {
      start_time: { type: String },
      end_time: { type: String },
    },
  ],
  work_timing: {
    start_time: { type: String },
    end_time: { type: String },
  },
  is_mood_off: { type: Boolean, default: false },
  user_type: {
    type: String,
    enum: ["Student", "Businessman", "Employed", "Others"],
  },
  sleeping_time: {
    start_time: { type: String },
    end_time: { type: String },
  },
  weekly_holiday: [
    {
      type: String,
      enum: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thusday",
        "Friday",
        "Saturday",
      ],
    },
  ],
});

exports.scheduleSchema = mongoose.model("schedule", scheduleSchema);

exports.schedule = scheduleSchema;
