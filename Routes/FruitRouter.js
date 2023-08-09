const express = require("express");
const cors = require("cors");
const Fruit = require("../database/Models/FruitPlantModel")

const router = express.Router();

const corsOptions = {
  origin: "*",
};

router.use(cors(corsOptions));

router.post("/", cors(), async (req, res) => {
  const newFruit = new Fruit({
    name: req.body.name,
    price: req.body.price,
    quantity : req.body.quantity,
    subImg: req.body.subImg,
    type : req.body.type,
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

router.put("/:id", cors(), (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  Fruit.findById(id)
    .then((fruit) => {
      fruit.set(updatedData);
      return Fruit.save();
    })
    .then((updatedFruit) => {
      res.status(200).json(updatedFruit);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

router.patch("/:id", cors(), (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  Fruit.findById(id)
    .then((Fruit) => {
      if (!Fruit) {
        return res.status(404).json({ error: "Fruit not found" });
      }

      Object.assign(Fruit, updatedData);

      return Fruit.save();
    })
    .then((updatedFruit) => {
      res.status(200).json(updatedFruit);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});


router.delete("/:id", cors(), (req, res) => {
  const { id } = req.params;

  Fruit.findByIdAndDelete(id)
    .then((deletedFruit) => {
      if (!deletedFruit) {
        return res.status(404).json({ error: "Fruit not found" });
      }

      res.status(200).json({ message: "Fruit deleted successfully" });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

router.get("/", cors(), async (req, res) => {
  await Fruit.find()
    .then((item) => {
      res.status(200).json(item);
    })
    .catch((error) => {
      res.status(500).json({ error: error.massage });
    });
});

module.exports = router;
