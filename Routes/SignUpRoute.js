const express = require("express");
const SignUpModel = require("../database/Models/Auth/SignUpModel");
const bcrypt = require("bcrypt");
const cors = require("cors")
const router = express.Router();

const corsOptions = {
  origin: "*",
};

router.use(cors(corsOptions));
router.post("/", cors(), async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await SignUpModel.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
      // User with the same email or username already exists.
      return res.status(409).json({
        success: false,
        message: "User with this email or username already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await SignUpModel.create({
      username,
      email,
      password: hashedPassword,
    });

    // User registration successful.
    res.json({
      success: true,
      message: "User registration successful.",
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({
      success: false,
      message: "Failed to register user. Please try again later.",
    });
  }
});

module.exports = router;