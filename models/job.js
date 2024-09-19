const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: "Please provide company name",
      maxlength: [50, "Max lenght is 50"],
    },
    position: {
      type: String,
      required: "Please provide position title",
      maxlength: [50, "Max lenght is 50"],
    },
    status: {
      type: String,
      enum: ["interview", "declined", "pending"],
      default: "pending",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      require: "Please provide user",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", JobSchema);
