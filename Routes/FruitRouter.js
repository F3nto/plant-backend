const express = require("express");
const cors = require("cors");
const Fruit = require("../database/Models/FruitPlantModel")

const router = express.Router();

const corsOptions = {
  origin: "*",
};

router.use(cors(corsOptions));

router.post("/", async (req, res) => {
  const newFruit = new Fruit({
    name: req.body.name,
    price: req.body.price,
    subImg: req.body.subImg,
    moreDetail: {
      subImg1: req.body.moreDetail.subImg1,
      light: req.body.moreDetail.light,
      soil: req.body.moreDetail.soil,
      water: req.body.moreDetail.water,
      temp: req.body.moreDetail.temp,
      fertilizer: req.body.moreDetail.fertilizer,
      description: req.body.moreDetail.description,
    },
  });

  await newFruit
    .save()
    .then((savedItem) => {
      res.status(200).json(savedItem);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

router.get("/", async (req, res) => {
  await Fruit.find()
    .then((item) => {
      res.status(200).json(item);
    })
    .catch((error) => {
      res.status(500).json({ error: error.massage });
    });
});

module.exports = router;
