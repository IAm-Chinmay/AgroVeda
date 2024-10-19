const express = require("express");
const {
  createPost,
  createReply,
  deletePost,
  getAllPost,
  getPostById,
} = require("../controller/community_controller");
const router = express.Router();
const fileUpload = require("../middleware/file-upload");

router.post("/create", fileUpload.single("image"), createPost);
router.post("/create-reply", createReply);
router.post("/get-all-post", getAllPost);
router.post("/get-all-post-byId", getPostById);
router.post("/delete-post", deletePost);

module.exports = router;
