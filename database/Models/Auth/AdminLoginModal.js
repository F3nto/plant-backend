const mongoose = require("mongoose");

const AdminLoginSchema = mongoose.Schema(
  {
    email : {type: String, required : true},
    password : {type: String, required : true}
  },
  { timeStamps: true }
);

module.exports = mongoose.model("AdminLogin", AdminLoginSchema);
