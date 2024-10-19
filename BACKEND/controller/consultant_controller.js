const Consultant = require("../models/consultant_model");
const bcrypt = require("bcrypt");

exports.signUp = async (req, res) => {
  const { username, email, password, phoneNumber } = req.body;

  try {
    // Check if email already exists
    const exist = await Consultant.findOne({ email: email });
    if (exist) {
      return res.status(409).json({ message: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create a new user
    const createUser = new Consultant({
      username,
      email,
      password: hashedPassword,
      phoneNumber,
    });

    // Save the user
    await createUser.save();

    // Send response
    res.status(201).json({ userId: createUser.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Consultant.findOne({ email: email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ userId: user.id, role: user.role });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.log(error);
  }
};

exports.getUserById = async (req, res) => {
  const { userId } = req.body;
  let user;
  try {
    user = await Consultant.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (er) {
    console.log(er);
    res.status(500).json({ message: "Something went wrong" });
  }
};
