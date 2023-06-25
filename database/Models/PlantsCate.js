const mongoose = require("mongoose");

const CategoriesSchema = new mongoose.Schema(
  {
    plantCateName: { type: String, required: true },
    img1: { type: String, required: true },
    img2: { type: String, required: true},
    img3: { type: String, required: true},
    img4: { type: String, required: true},

  },
  { timestamps: true }
);

module.exports = mongoose.model("Categories", CategoriesSchema);
