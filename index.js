const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const db = require("./database/db");

//! Routers
const CategoriesRoute = require("./Routes/CategoriesRoute");
const IndoorPlantRoute = require("./Routes/IndoorPlantRoute")
const FruitPlantRoute = require("./Routes/FruitRouter");
const FlowerRoute = require("./Routes/FlowerRoute");

dotenv.config();

const app = express();

const corsOptions = {
  origin: "*",
};

//! Middleware
app.use(express.json());
app.use(cors(corsOptions));

app.use(cors(), (req, res, next) => {
  console.log(`${req.url} : ${req.method}`);

  next();
});


app.use(`api/v1/categories`, CategoriesRoute);
app.use(`api/v1/indoor-plants`, IndoorPlantRoute);
app.use(`api/v1/fruit`, FruitPlantRoute);
app.use(`api/v1/flower`, FlowerRoute);


app.listen(process.env.PORT, () => {
  console.log(`Server is running at ${process.env.PORT}`);
});

db.on("error...", console.error.bind(console, "MongoDB connection error!!!"));
