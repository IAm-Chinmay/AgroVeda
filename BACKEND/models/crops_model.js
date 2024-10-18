const mongoose = require("mongoose");
const cropScheme = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  image: String,
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  stockQuantity: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  shipingAddress: {
    type: String,
    required: true,
  },
  farmerId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

cropScheme.index({
  name: "text",
  description: "text",
});

const Crop = mongoose.model("Crop", cropScheme);

module.exports = Crop;
