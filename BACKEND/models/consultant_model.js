const mongoose = require("mongoose");

const cosultant_model = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: "consultant" },
  phoneNumber: { type: Number, required: true },
});

module.exports = mongoose.model("Consultant", cosultant_model);
