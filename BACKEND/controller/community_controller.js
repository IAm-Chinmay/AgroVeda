const {
  CommunityPost,
  CommunityReply,
} = require("../models/community_forum_model");
const fs = require("fs");
const path = require("path");

const User = require("../models/user_model");

exports.createPost = async (req, res) => {
  const { title, desc, uid } = req.body;
  const newPost = new CommunityPost();
  newPost.title = title;
  newPost.desc = desc;
  newPost.userId = uid;
  newPost.image = req.file.path.replace(/\\/g, "/");
  let user;

  try {
    user = await User.findById(uid);
  } catch (err) {
    console.log(err);
  }

  try {
    await newPost.save();
    user.post.push(newPost._id);
    await user.save();
  } catch (er) {
    res.status(400).send(er);
    console.log(er);
  }
  res.send("Post Created");
};

exports.createReply = async (req, res) => {
  const { reply, postId, userId } = req.body;
  const cReply = new CommunityReply();
  cReply.reply = reply;
  cReply.postId = postId;
  let community;
  let user;

  try {
    user = await User.findById(userId).select("username");

    if (!user) {
      return res.status(404).send("User not found");
    }
    cReply.user = user.username;

    community = await CommunityPost.findById(postId);
    if (!community) {
      return res.status(404).send("Post not found");
    }
  } catch (err) {
    console.log(err);
  }

  try {
    await cReply.save();
    community.replies.push(cReply);
    await community.save();
  } catch (err) {
    res.status(400).send(err);
    console.log(err);
  }

  res.status(200).send("Reply Created");
};

exports.deletePost = async (req, res) => {
  const postId = req.body.postId;

  try {
    const post = await CommunityPost.findById(postId).populate("userId");
    if (!post) {
      return res.status(404).send("Post not found");
    }

    const user = post.userId;
    console.log(user);
    if (!user) {
      return res.status(404).send("User not found");
    }

    user.post.pull(postId);
    await user.save();

    await post.deleteOne();

    const imagePath = path.join(__dirname, "..", post.image);
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error("Error deleting image:", err);
      } else {
        console.log("Image successfully deleted.");
      }
    });

    res.send("Post and associated image deleted successfully");
  } catch (err) {
    console.error("Error deleting post:", err);
    res.status(500).send("An error occurred while deleting the post");
  }
};

exports.getPostById = async (req, res) => {
  const { postId } = req.body;
  try {
    const post = await CommunityPost.findById(postId)
      .populate("userId", "username")
      .exec();

    if (!post) {
      return res.status(404).send("Post not found");
    }

    const createdAt = new Date(post.createdAt);
    const time = createdAt.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    return res.status(200).json({
      ...post.toObject(),
      createdAtTime: time,
    });
  } catch (er) {
    console.log(er);
  }
};

exports.getAllPost = async (req, res) => {
  const { userId } = req.body;

  try {
    const posts = await CommunityPost.find({ userId: { $ne: userId } });

    if (!posts || posts.length === 0) {
      return res.status(404).json({ message: "No posts found" });
    }

    res.status(200).json(posts);
  } catch (er) {
    console.log(er);
    res
      .status(500)
      .json({ message: "Something went wrong", error: er.message });
  }
};
