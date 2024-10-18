const mongoose = require("mongoose");
// const unique_validator = require("mongoose-unique-validator");

const schema = mongoose.Schema;

const userSchema = new schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  post: [
    { type: mongoose.Types.ObjectId, required: true, ref: "CommunityPost" },
  ],
  crops: [{ type: mongoose.Types.ObjectId, ref: "Crop" }],
});

// userSchema.plugin(unique_validator);

module.exports = mongoose.model("User", userSchema);
