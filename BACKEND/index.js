const express = require("express");
const { spawn } = require("child_process");
const cors = require("cors");
const { connectDB } = require("./connection");
const axios = require("axios");
require("dotenv").config();
const fs = require("fs");
const path = require("path");

const user_routes = require("./routes/user_routes.js");
// const rawData = fs.readFileSync(dataFilePath);
// const cropData = JSON.parse(rawData);

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
connectDB("mongodb://localhost:27017/TheVedas");

app.use("/uploads", express.static("uploads"));
app.use("/api/user", user_routes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
