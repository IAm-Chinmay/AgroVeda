const mongoose = require("mongoose");
const marketSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  image: String,
  category: {
    type: String,
    required: true,
    enum: [
      "fertilizer",
      "pesticide",
      "herbicide",
      "Seeds",
      "animal feed",
      "other",
      "machinery",
      "agri electronics",
      "agri tools",
    ],
  },
  cropsApplicable: {
    type: [String],
    default: [],
  },
  content: {
    type: String,
    trim: true,
  },
  wayOfApplication: {
    type: String,
  },
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
  sellerId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Vendors",
  },
});

marketSchema.index({
  name: "text",
  category: "text",
  cropsApplicable: "text",
  content: "text",
  wayOfApplication: "text",
});

const Market = mongoose.model("Market", marketSchema);

module.exports = Market;
