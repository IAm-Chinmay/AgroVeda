const Vendors = require("../models/vendors_model");
const bcrypt = require("bcrypt");
const Market = require("../models/market_model");

const addProduct = async (req, res) => {
  try {
    const {
      name,
      category,
      cropsApplicable,
      content,
      wayOfApplication,
      price,
      stockQuantity,
      inStock,
      description,
      sellerId,
    } = req.body;

    if (!name || !category || !content || price == null) {
      return res
        .status(400)
        .json({ message: "Name, category, content, and price are required." });
    }

    const vendor = await Vendors.findById(sellerId);
    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    const newProduct = new Market({
      image: req.file.path.replace(/\\/g, "/"),
      name: name.trim(),
      category: category.trim(),
      cropsApplicable: cropsApplicable
        ? cropsApplicable.map((crop) => crop.trim())
        : [],
      content: content.trim(),
      wayOfApplication: wayOfApplication ? wayOfApplication.trim() : undefined,
      price: parseFloat(price),
      stockQuantity: stockQuantity != null ? parseInt(stockQuantity) : 0,
      inStock: inStock || stockQuantity > 0,
      sellerId: sellerId,
      description: description,
    });

    const savedProduct = await newProduct.save();

    vendor.post.push(savedProduct._id);
    await vendor.save();

    res.status(201).json({
      message: "Product added successfully!",
      product: savedProduct,
    });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const getProduct = async (req, res) => {
  try {
    const posts = await Market.find();

    if (!posts || posts.length === 0) {
      return res.status(404).json({ message: "No posts found" });
    }

    const groupedProducts = posts.reduce((grouped, product) => {
      const { category } = product;
      if (!grouped[category]) {
        grouped[category] = [];
      }
      grouped[category].push(product);
      return grouped;
    }, {});

    res.status(200).json(groupedProducts);
  } catch (er) {
    console.log(er);
    res
      .status(500)
      .json({ message: "Something went wrong", error: er.message });
  }
};

const getProductById = async (req, res) => {
  const { postId } = req.body;

  try {
    const post = await Market.findById(postId).exec();

    if (!post) {
      return res.status(404).send("Post not found");
    }

    return res.status(200).send(post);
  } catch (er) {
    console.log(er);
    return res.status(500).send("Something went wrong !");
  }
};

const searchProducts = async (req, res) => {
  const { searchTerm } = req.body;

  try {
    if (!searchTerm) {
      return res.status(400).json({ message: "Search term is required." });
    }

    const results = await Market.find(
      {
        $text: { $search: searchTerm },
      },
      {
        score: { $meta: "textScore" },
      }
    ).sort({
      score: { $meta: "textScore" },
    });

    if (!results.length) {
      return res.status(404).json({
        message: "No products found for the given search term.",
      });
    }

    const groupedProducts = results.reduce((grouped, product) => {
      const { category } = product;
      if (!grouped[category]) {
        grouped[category] = [];
      }
      grouped[category].push(product);
      return grouped;
    }, {});

    res.status(200).json({
      message: "Results Found",
      products: groupedProducts,
    });
  } catch (error) {
    console.error("Error during product search:", error);
    res.status(500).json({
      message: "Internal server error occurred during search.",
      error: error.message,
    });
  }
};

const signUp = async (req, res) => {
  const { company_name, email, password, phoneNumber } = req.body;

  try {
    // Check if email already exists
    const exist = await Vendors.findOne({ email: email });
    if (exist) {
      return res.status(409).json({ message: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create a new user
    const createUser = new Vendors({
      company_name,
      email,
      password: hashedPassword,
      phoneNumber,
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

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Vendors.findOne({ email: email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(201).json({ userId: user.id, role: user.role });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.log(error);
  }
};

const getUserById = async (req, res) => {
  const { userId } = req.body;
  console.log(userId);
  let user;
  try {
    user = await Vendors.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (er) {
    console.log(er);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  addProduct,
  searchProducts,
  getProduct,
  getProductById,
  signUp,
  loginUser,
  getUserById,
};
