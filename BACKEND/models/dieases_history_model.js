const mongoose = require("mongoose");

const dieasesHistorySchema = new mongoose.Schema({
  dieasesName: String,
  user: mongoose.Schema.ObjectId,
  dieaseDate: { type: Date, default: Date.now },
  image: String,
});

dieasesHistorySchema.post("remove", function (doc) {
  console.log(doc.image);
  if (doc.image) {
    const normalizedPath = doc.image.replace(/\\/g, "/");
    const imagePath = path.join(
      __dirname,
      "./uploads",
      path.basename(normalizedPath)
    );
    console.log(imagePath);

    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error("Failed to delete image:", err);
      } else {
        console.log("Successfully deleted image:", imagePath);
      }
    });
  }
});

const dieasesHistory = mongoose.model("dieasesHistory", dieasesHistorySchema);

module.exports = dieasesHistory;
