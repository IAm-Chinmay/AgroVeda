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

//User Routes
app.use("/api/user", user_routes);

//History Data Ecom
app.post("/api/histecodata", async (req, res) => {
  const { date, month, year, crop, state } = req.body;

  try {
    await axios
      .get(
        `https://api.data.gov.in/resource/35985678-0d79-46b4-9ed6-6f13308a1d24?api-key=579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b&format=json&limit=999&filters%5BState.keyword%5D=${state}&filters%5BCommodity.keyword%5D=${crop}&filters%5BArrival_Date%5D=${date}%2F${month}%2F${year}`
      )
      .then((resp) => {
        console.log(resp.data.records.length);
        res.send(resp.data.records);
      });
  } catch (er) {
    console.log(er);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
