const dieasesHistory = require("../models/dieases_history_model");

exports.createDieases = async (req, res) => {
  const { dName, user } = req.body;

  const dHistory = new dieasesHistory({
    dieasesName: dName,
    user,
    image: req.file.path.replace(/\\/g, "/"),
  });

  try {
    await dHistory.save();
    const allUserEntries = await dieasesHistory
      .find({ user })
      .sort({ dieaseDate: -1 });

    if (allUserEntries.length > 3) {
      const entriesToRemove = allUserEntries.slice(3);
      for (const entry of entriesToRemove) {
        await dieasesHistory.findOneAndDelete({ _id: entry._id });
      }
    }
  } catch (er) {
    console.log(er);
  }
  res.send("History Created");
};

exports.getDieases = async (req, res) => {
  const { userId } = req.body;

  try {
    const userDiseases = await dieasesHistory.find({ user: userId });

    if (userDiseases.length > 0) {
      console.log(`Found ${userDiseases.length} diseases for user ${userId}:`);
      return res.status(200).send(userDiseases);
    } else {
      console.log(`No diseases found for user ${userId}`);
      return res.status(404).send("No diseases found");
    }
  } catch (err) {
    console.error("Error finding diseases by user:", err);
  }
};
