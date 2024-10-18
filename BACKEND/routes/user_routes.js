const express = require("express");
const router = express.Router();

const {
  signUp,
  loginUser,
  getUserById,
  uploadCrop,
  getAllFarmerProduct,
} = require("../controller/user_controller");

const fileUpload = require("../middleware/file-upload");

router.post("/signup", signUp);
router.post("/login", loginUser);
router.post("/getuserbyid", getUserById);
router.post("/uploadCrop", fileUpload.single("image"), uploadCrop);
router.post("/getProduct", getAllFarmerProduct);

module.exports = router;
