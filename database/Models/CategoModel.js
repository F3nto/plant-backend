const mongoose = require("mongoose");

const CategoriesSchema = mongoose.Schema(
  {
    plantCateName: { type: String, required: true },
    img: {
      img1: { type: String, required: true },
      img2: { type: String, required: true },
      img3: { type: String, required: true },
      img4: { type: String, required: true },
    },
  },
  { timeStamps: true }
);

module.exports = mongoose.model("Categories", CategoriesSchema);
