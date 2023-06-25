const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology : true})
  .then(() => {
    console.log("database is connected!!!");
  })
  .catch((e) => {
    console.error(e);
  });

const db = mongoose.connection;

module.exports = db;