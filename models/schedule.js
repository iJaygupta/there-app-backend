var mongoose = require("mongoose");
const Schema = mongoose.Schema;

var scheduleSchema = new mongoose.Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "user" },
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
}, {
  timestamps: true
});

exports.schedule = scheduleSchema;
