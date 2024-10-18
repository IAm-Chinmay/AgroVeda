const User = require("../models/user_model");
const bcrypt = require("bcrypt");
const Crop = require("../models/crops_model");

exports.signUp = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    // Check if email already exists
    const exist = await User.findOne({ email: email });
    if (exist) {
      return res.status(409).json({ message: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create a new user
    const createUser = new User({
      username,
      email,
      password: hashedPassword,
      role,
    });

    // Save the user
    await createUser.save();

    // Send response
    res.status(201).json({ userId: createUser.id, role: createUser.role });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the email exists
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    // const token = jwt.sign({ email: user.email }, "secret");
    res.status(201).json({ userId: user.id, role: user.role });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.log(error);
  }
};

exports.getUserById = async (req, res) => {
  const { userId } = req.body;
  console.log(userId);
  let user;
  try {
    user = await User.findById(userId).select("-password").populate({
      path: "crops",
      model: "Crop",
      select: "name image price description stockQuantity shipingAddress",
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (er) {
    console.log(er);
    res.status(500).json({ message: "Something went wrong" });
  }
};

exports.uploadCrop = async (req, res) => {
  try {
    const {
      name,
      price,
      stockQuantity,
      inStock,
      description,
      farmerId,
      shipingAddress,
    } = req.body;
    if (!name || !stockQuantity || !description || price == null) {
      return res.status(400).json({
        message: "Name, stockQuantity, description, and price are required.",
      });
    }

    const farmer = await User.findById(farmerId);
    if (!farmer) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    const newProduct = new Crop({
      image: req.file.path.replace(/\\/g, "/"),
      name: name.trim(),
      price: parseFloat(price),
      stockQuantity: stockQuantity != null ? parseInt(stockQuantity) : 0,
      inStock: inStock || stockQuantity > 0,
      farmerId: farmerId,
      description: description,
      shipingAddress: shipingAddress,
    });

    const savedProduct = await newProduct.save();

    farmer.crops.push(savedProduct._id);
    await farmer.save();

    res.status(201).json({
      message: "Product added successfully!",
      product: savedProduct,
    });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

exports.getAllFarmerProduct = async (req, res) => {
  try {
    const posts = await Crop.find();

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
