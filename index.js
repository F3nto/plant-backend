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

const apiVersion = "/api/v1";

app.use(`${apiVersion}/categories`, CategoriesRoute);
app.use(`${apiVersion}/indoor-plants`, IndoorPlantRoute);
app.use(`${apiVersion}/fruit`, FruitPlantRoute);
app.use(`${apiVersion}/flower`, FlowerRoute);


app.listen(process.env.PORT, () => {
  console.log(`Server is running at ${process.env.PORT}`);
});

db.on("error...", console.error.bind(console, "MongoDB connection error!!!"));
