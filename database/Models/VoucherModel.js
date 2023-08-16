const mongoose = require("mongoose");

const VoucherSchema = mongoose.Schema(
  {
    allTotal: { type: Number, required: true },
    items: [
      {
        subImg: { type: String, required: true },
        name: { type: String, required: true },
        price: { type: String, required: true },
        quantity: { type: Number, required: true },
        total: { type: Number, required: true },
      },
    ],
    otherAddr: { type: String, required: true },
    selectedCity: { type: String, required: true },
    selectedState: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", VoucherSchema);
