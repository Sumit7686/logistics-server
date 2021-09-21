const mongoose = require("mongoose");

const userComplaintsSchema = new mongoose.Schema(
  {
    user_id: { type: String },
    subject: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

const UserComplaint = mongoose.model("UserComplaint", userComplaintsSchema);

module.exports = UserComplaint;
