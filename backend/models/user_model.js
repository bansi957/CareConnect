const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: String, required: true },
  role: { type: String, default: "patient" },
  // Health profile fields
  bloodGroup: { type: String, default: "" },
  age: { type: String, default: "" },
  weight: { type: String, default: "" },
  height: { type: String, default: "" },
  hasSugar: { type: Boolean, default: false },
  sugarDetails: { type: String, default: "" },
  hasBP: { type: Boolean, default: false },
  bpDetails: { type: String, default: "" },
});

module.exports = mongoose.model("User", userSchema);
