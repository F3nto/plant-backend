const mongoose = require("mongoose");

const IndoorPlantSchema = mongoose.Schema(
  {
    plantName: { type: String, required: true },
    img: { type: String, required: true },
    price: { type: String, required: true },
    moreDetail: {
      img1: { type: String, required: true },
      light: { type: String, required: true },
      soil: { type: String, required: true },
      water: { type: String, required: true },
      temp: { type: String, required: true },
      fertilizer: { type: String, required: true },
    },
  },

  { timeStamps: true }
);

module.exports = mongoose.model("IndoorPlant", IndoorPlantSchema);
