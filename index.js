const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const db = require("./database/db");

//! Routers
const CategoriesRoute = require("./Routes/CategoriesRoute");
const IndoorPlantRoute = require("./Routes/IndoorPlantRoute");
const FruitPlantRoute = require("./Routes/FruitRouter");
const FlowerRoute = require("./Routes/FlowerRoute");
const SignUpRoute = require("./Routes/SignUpRoute");
const LoginRoute = require("./Routes/loginRoute");
const RawMatRoute = require("./Routes/RawMatRoute");
const AdminSignUpRoute = require("./Routes/AdminSignUpRoute");
const AdminLoginRoute = require("./Routes/AdminLoginRoute");

dotenv.config();

const app = express();

const corsOptions = {
  origin: "*",
};

//! Middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true })); 

app.use(cors(), (req, res, next) => {
  console.log(`${req.url} : ${req.method}`);

  next();
});

app.use(`/api/v1/categories`, CategoriesRoute);
app.use(`/api/v1/indoor-plants`, IndoorPlantRoute);
app.use(`/api/v1/fruit`, FruitPlantRoute);
app.use(`/api/v1/flower`, FlowerRoute);
app.use(`/api/v1/industiral-raw-material`, RawMatRoute);
app.use(`/signup`, SignUpRoute);
app.use(`/login`, LoginRoute);
app.use(`/admin-signup`, AdminSignUpRoute);
app.use(`/admin-login`, AdminLoginRoute);



app.listen(process.env.PORT, () => {
  console.log(`Server is running at ${process.env.PORT}`);
});

db.on("error...", console.error.bind(console, "MongoDB connection error!!!"));
