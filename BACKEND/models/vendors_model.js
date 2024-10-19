const mongoose = require("mongoose");

const vendor_model = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  company_name: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: "vendor" },
  phoneNumber: { type: Number, required: true },
  post: [{ type: mongoose.Types.ObjectId, required: true, ref: "Market" }],
});

module.exports = mongoose.model("Vendors", vendor_model);
