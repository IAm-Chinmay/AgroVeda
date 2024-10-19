const mongoose = require("mongoose");

const communityReplyScheme = new mongoose.Schema({
  reply: String,
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "communityPost" },
  user: { type: String },
});

const communityScheme = new mongoose.Schema(
  {
    title: { type: String, required: true },
    desc: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    image: String,
    replies: [communityReplyScheme],
  },
  { timestamps: true }
);
const CommunityPost = mongoose.model("communityPost", communityScheme);
const CommunityReply = mongoose.model("communityReply", communityReplyScheme);

module.exports = {
  CommunityPost,
  CommunityReply,
};
