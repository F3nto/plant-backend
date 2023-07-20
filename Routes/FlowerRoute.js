const express = require("express");
const cors = require("cors");
const Flower = require("../database/Models/FlowerModel")

const router = express.Router();

const corsOptions = {
  origin: "https://express-back-rho.vercel.app/",
};

router.use(cors(corsOptions));

router.post("/", cors(), async (req, res) => {
  const newFlower = new Flower({
    name: req.body.name,
    subImg: req.body.subImg,
    price : req.body.price,
    moreDetail: {
      description: req.body.moreDetail.description,
      subImg1: req.body.moreDetail.subImg1,
      subImg2: req.body.moreDetail.subImg2,
      subImg3: req.body.moreDetail.subImg3,
      light: req.body.moreDetail.light,
      soil: req.body.moreDetail.soil,
      water: req.body.moreDetail.water,
      temp: req.body.moreDetail.temp,
      fertilizer: req.body.moreDetail.fertilizer,
    
    },
  });

  await newFlower
    .save()
    .then((savedItem) => {
      res.status(200).json(savedItem);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

router.get("/", cors(), async (req, res) => {
  await Flower.find()
    .then((item) => {
      res.status(200).json(item);
    })
    .catch((error) => {
      res.status(500).json({ error: error.massage });
    });
});

module.exports = router;
