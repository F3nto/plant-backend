const express = require("express");
const cors = require("cors");
const Flower = require("../database/Models/FlowerModel");

const router = express.Router();

const corsOptions = {
  origin: "*",
};

router.use(cors(corsOptions));

router.post("/", cors(), async (req, res) => {
  try {
    
    const newFlower = new Flower({
      name: req.body.name,
      subImg: req.body.subImg,
      price: req.body.price,
      quantity : req.body.quantity,
      type: req.body.type,
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

   
    const savedItem = await newFlower.save();

    
    res.status(200).json(savedItem);
  } catch (error) {
    
    res.status(500).json({ error: error.message });
  }
});

router.patch("/:id", cors(), (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  Flower.findById(id)
    .then((flower) => {
      if (!flower) {
        return res.status(404).json({ error: "Flower not found" });
      }

      Object.assign(flower, updatedData);

      return flower.save();
    })
    .then((updatedFlower) => {
      res.status(200).json(updatedFlower);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

router.delete("/:id", cors(), (req, res) => {
  const { id } = req.params;

  Flower.findByIdAndDelete(id)
    .then((deletedFlower) => {
      if (!deletedFlower) {
        return res.status(404).json({ error: "Flower not found" });
      }

      res.status(200).json({ message: "Flower deleted successfully" });
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
