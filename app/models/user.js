const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    role: { type: String, default: "user" },
    name: { type: String, required: true },
    email: { type: String, required: true },
    pincode: { type: Number, required: true },
    contact: { type: String, required: true },
    password: { type: String, required: true },
    otp: { type: Number },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
