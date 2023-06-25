const express = require("express");
const Categories = require("../database/Models/PlantsCate");
const cors = require("cors");

const router = express.Router();

const corsOptions = {
  origin: "*",
};

router.use(cors(corsOptions));

router.post("/", cors(), async (req, res) => {
  const plantCateName = req.body.plantCateName;
  const img1 = req.body.img1;
  const img2 = req.body.img2;
  const img3 = req.body.img3;
  const img4 = req.body.img4;

  const addItem = new Categories({
    plantCateName: plantCateName,
    img1: img1,
    img2: img2,
    img3: img3,
    img4: img4,
  });

  await addItem
    .save()
    .then((savedItem) => {
      res.status(200).json({ Created: savedItem });
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
