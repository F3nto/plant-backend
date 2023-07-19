const mongoose = require("mongoose");

const FruitPlantSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: String, required: true },
    subImg: { type: String, required: true },
    moreDetail: {
      subImg1: { type: String, required: true },
      light: { type: String, required: true },
      soil: { type: String, required: true },
      water: { type: String, required: true },
      temp: { type: String, required: true },
      fertilizer: { type: String, required: true },
      description: { type: String, required: true },
    },
  },
  { timeStamps: true }
);

module.exports = mongoose.model("FruitSchema", FruitPlantSchema);
