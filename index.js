const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const db = require("./database/db");

//! Routers
const plantsCategories = require("./Routes/PlantsCate");

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

app.use(`${apiVersion}/plantscategories`, plantsCategories);

app.listen(process.env.PORT, () => {
  console.log(`Server is running at ${process.env.PORT}`);
});

db.on("error...", console.error.bind(console, "MongoDB connection error!!!"));
