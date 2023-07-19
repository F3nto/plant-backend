const mongoose = require("mongoose");

const FlowerSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    subImg: { type: String, required: true },
    price : {type : String, required: true},
    moreDetail: {
      description: { type: String, required: true },
      subImg1: { type: String, required: true },
      subImg2: { type: String, required: true },
      subImg3: { type: String, required: true },
      light: { type: String, required: true },
      soil: { type: String, required: true },
      water: { type: String, required: true },
      temp: { type: String, required: true },
      fertilizer: { type: String, required: true },
    },
  },
  { timeStamps: true }
);

module.exports = mongoose.model("Flower", FlowerSchema);
