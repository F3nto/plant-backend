const express = require("express");
const cors = require("cors");
const Voucher = require("../database/Models/VoucherModel")

const router = express.Router();

const corsOptions = {
  origin: "*",
};

router.use(cors(corsOptions));

router.post("/", cors(), async (req, res) => {
   const newVoucher = new Voucher(req.body);
  
  await newVoucher
    .save()
    .then((savedItem) => {
      res.status(200).json(savedItem);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

router.get("/", cors(), async (req, res) => {
  await Voucher.find()
    .then((item) => {
      res.status(200).json(item);
    })
    .catch((error) => {
      res.status(500).json({ error: error.massage });
    });
});

module.exports = router;
