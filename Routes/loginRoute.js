const express = require("express");
const SignUpModel = require("../database/Models/Auth/SignUpModel");
const bcrypt = require("bcrypt");
const cors = require("cors")
const jwt = require("jsonwebtoken")
const router = express.Router();

const corsOptions = {
  origin: "*",
};

router.use(cors(corsOptions));

router.post("/", cors(), (req, res) => {
  const { email, password } = req.body;

  SignUpModel.findOne({ email })
    .then((user) => {
      if (!user) {
        // User not found in the database
        return res.status(404).json({
          success: false,
          message: "User not found. Please check your email and password.",
        });
      }

      
      bcrypt.compare(password, user.password)
        .then((isMatch) => {
          if (isMatch) {
            
            const token = jwt.sign({ userId: user._id }, "Lu_Pyo_Gyi", {
              expiresIn: "1h", 
            });

            res.json({
              success: true,
              message: "User login successful.",
              token, 
              user: {
                id: user._id,
                username: user.username,
                email: user.email,
              },
            });
          } else {
            // Passwords do not match
            res.status(401).json({
              success: false,
              message: "Incorrect password. Please check your email and password.",
            });
          }
        })
        .catch((error) => {
          console.error("Error comparing passwords:", error);
          res.status(500).json({
            success: false,
            message: "An error occurred while logging in. Please try again later.",
          });
        });
    })
    .catch((error) => {
      console.error("Error finding user:", error);
      res.status(500).json({
        success: false,
        message: "An error occurred while logging in. Please try again later.",
      });
    });
});

module.exports = router;