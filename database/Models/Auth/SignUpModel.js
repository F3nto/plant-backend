const mongoose = require("mongoose");

const SignUpSchema = mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      default: "visitor",
    },
  },
  { timeStamps: true }
);

module.exports = mongoose.model("SignUp", SignUpSchema);
