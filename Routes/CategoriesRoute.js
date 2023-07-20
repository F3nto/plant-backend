const express = require("express");
const Categories = require("../database/Models/CategoModel");
const cors = require("cors");

const router = express.Router();

const corsOptions = {
  origin: "https://express-back-rho.vercel.app/",
};

router.use(cors(corsOptions));

router.post("/", cors(), async (req, res) => {
  const newCategory = new Categories({
    plantCateName: req.body.plantCateName,
    img: {
      img1: req.body.img.img1,
      img2: req.body.img.img2,
      img3: req.body.img.img3,
      img4: req.body.img.img4,
    },

  });

  await newCategory
    .save()
    .then((savedItem) => {
      res.status(200).json(savedItem);
    })
    .catch((error) => {
      res.status(500).json({ error: error.massage });
    });
});

router.get("/", cors(), async (req, res) => {
  await Categories.find()
    .then((item) => {
      res.status(200).json(item);
    })
    .catch((error) => {
      res.status(500).json({ error: error.massage });
    });
});

module.exports = router;
