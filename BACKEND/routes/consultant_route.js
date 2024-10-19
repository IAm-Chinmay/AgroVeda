const express = require("express");
const router = express.Router();

const {
  signUp,
  loginUser,
  getUserById,
} = require("../controller/consultant_controller");

router.post("/signup", signUp);
router.post("/login", loginUser);
router.post("/getuserbyid", getUserById);

module.exports = router;
