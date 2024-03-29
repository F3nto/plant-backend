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
    name: req.body.name,
    subImg: req.body.subImg,
    price: req.body.price,
    quantity : req.body.quantity,
    type : req.body.type,
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


router.put("/:id", cors(), (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  IndoorPlant.findById(id)
    .then((indoor) => {
      indoor.set(updatedData);
      return IndoorPlant.save();
    })
    .then((updatedIndoor) => {
      res.status(200).json(updatedIndoor);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});


router.patch("/:id", cors(), (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  IndoorPlant.findById(id)
    .then((IndoorPlant) => {
      if (!IndoorPlant) {
        return res.status(404).json({ error: "Indoor not found" });
      }

      Object.assign(IndoorPlant, updatedData);

      return IndoorPlant.save();
    })
    .then((updatedIndoor) => {
      res.status(200).json(updatedIndoor);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});


router.delete("/:id", cors(), (req, res) => {
  const { id } = req.params;

  IndoorPlant.findByIdAndDelete(id)
    .then((deletedIndoor) => {
      if (!deletedIndoor) {
        return res.status(404).json({ error: "Indoor not found" });
      }

      res.status(200).json({ message: "Indoor deleted successfully" });
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
