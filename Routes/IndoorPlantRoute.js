const express = require("express");
const cors = require("cors");
const IndoorPlant = require("../database/Models/IndoorPlant");

const router = express.Router();

const corsOptions = {
  origin: "*",
};

router.use(cors(corsOptions));

router.post("/", cors(), async (req, res) => {
  const newIndoorPlant = new IndoorPlant({
    plantName: req.body.plantName,
    img: req.body.img,
    price: req.body.price,
    moreDetail: {
      img1: req.body.moreDetail.img1,
      light: req.body.moreDetail.light,
      soil: req.body.moreDetail.soil,
      water: req.body.moreDetail.water,
      temp: req.body.moreDetail.temp,
      fertilizer: req.body.moreDetail.fertilizer,
    },
  });

  await newIndoorPlant
    .save()
    .then((savedItem) => {
      res.status(200).json(savedItem);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

router.get("/", cors(), async (req, res) => {
  await IndoorPlant.find()
    .then((item) => {
      res.status(200).json(item);
    })
    .catch((error) => {
      res.status(500).json({ error: error.massage });
    });
});

module.exports = router;
