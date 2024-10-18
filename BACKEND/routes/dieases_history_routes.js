const express = require("express");
const router = express.Router();
const {
  createDieases,
  getDieases,
} = require("../controller/dieases_history_controller");
const fileUpload = require("../middleware/file-upload");

router.post("/createDiease", fileUpload.single("image"), createDieases);

router.post("/getdiseases", getDieases);

module.exports = router;
