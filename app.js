// app.js
require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { dbConnect } = require("./connection");
const cors = require("cors");
const { userRouter } = require("./routes/userRoute");
const { productRouter } = require("./routes/productRoute");
const { orderRouter } = require("./routes/orderRoute");
const { ghlRouter } = require("./routes/ghlRoute");
const port = process.env.PORT || 3000;
const colors = require("colors");

// middlware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

dbConnect("mongodb+srv://Printful:1234@cluster0.v3fivoz.mongodb.net/Printful")
  .then(() => {
    console.log("DB Connection Successfull".green.bgGreen);
  })
  .catch((e) => {
    console.log("No DB Connection".green.bgRed + e);
  });

app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/orders", orderRouter);
app.use(ghlRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`.green.bgGreen);
});
