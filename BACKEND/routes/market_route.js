const express = require("express");
const router = express.Router();

const {
  addProduct,
  searchProducts,
  getProduct,
  getProductById,
  signUp,
  loginUser,
  getUserById,
} = require("../controller/market_controller");
const fileUpload = require("../middleware/file-upload");

router.post("/addpost", fileUpload.single("image"), addProduct);
router.post("/search", searchProducts);
router.post("/getAllPost", getProduct);
router.post("/getProById", getProductById);
router.post("/signup", signUp);
router.post("/login", loginUser);
router.post("/getuserbyid", getUserById);
module.exports = router;
