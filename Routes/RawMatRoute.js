const express = require("express");
const cors = require("cors");
const RawMat = require("../database/Models/RawMatModel")

const router = express.Router();

const corsOptions = {
  origin: "*",
};

router.use(cors(corsOptions));

router.post("/", cors(), async (req, res) => {
  const newRawMat = new RawMat({
    name: req.body.name,
    subImg: req.body.subImg,
    price : req.body.price,
    quantity : req.body.quantity,
    type : req.body.type,
    moreDetail: {
      description: req.body.moreDetail.description,
      subImg1: req.body.moreDetail.subImg1,
      light: req.body.moreDetail.light,
      soil: req.body.moreDetail.soil,
      water: req.body.moreDetail.water,
      temp: req.body.moreDetail.temp,
      fertilizer: req.body.moreDetail.fertilizer,
    
    },
  });

  await newRawMat
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

  RawMat.findById(id)
    .then((raw) => {
      raw.set(updatedData);
      return RawMat.save();
    })
    .then((updatedRaw) => {
      res.status(200).json(updatedRaw);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});


router.patch("/:id", cors(), (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  RawMat.findById(id)
    .then((RawMat) => {
      if (!RawMat) {
        return res.status(404).json({ error: "Fruit not found" });
      }

      Object.assign(RawMat, updatedData);

      return RawMat.save();
    })
    .then((updatedRawMat) => {
      res.status(200).json(updatedRawMat);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});


router.delete("/:id", cors(), (req, res) => {
  const { id } = req.params;

  RawMat.findByIdAndDelete(id)
    .then((deletedRawMat) => {
      if (!deletedRawMat) {
        return res.status(404).json({ error: "Raw Mat not found" });
      }

      res.status(200).json({ message: "Raw Mat deleted successfully" });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

router.get("/", cors(), async (req, res) => {
  await RawMat.find()
    .then((item) => {
      res.status(200).json(item);
    })
    .catch((error) => {
      res.status(500).json({ error: error.massage });
    });
});

module.exports = router;
