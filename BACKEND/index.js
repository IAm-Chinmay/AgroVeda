const express = require("express");
const { spawn } = require("child_process");
const cors = require("cors");
const { connectDB } = require("./connection");
const axios = require("axios");
require("dotenv").config();
const fs = require("fs");
const path = require("path");

const user_routes = require("./routes/user_routes.js");
const dieases_history_routes = require("./routes/dieases_history_routes.js");
const community_route = require("./routes/community_route");
const consultant_route = require("./routes/consultant_route.js");
const market_routes = require("./routes/market_route.js");

const dataFilePath = path.join(__dirname, "./crops_info.json");
const rawData = fs.readFileSync(dataFilePath);
const cropData = JSON.parse(rawData);

const stripe = require("stripe")(
  "sk_test_51QBcZQRrq29vGEbGsQoXRi5WiQrh4BqCmn3F68ZpzwAAXN57SHczFKMg4wjHtFcWOsXtMME50ckb0ncI2Rjo1LvW00uUbO0HPm"
);

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

//Find Fertilizer
app.post("/api/findfertilizer", async (req, res) => {
  const { crop_name, category, disease_name } = req.body;
  const pythonProcess = spawn("python", ["fertilizer_finder.py"]);

  pythonProcess.stdin.write(
    JSON.stringify({ crop_name, category, disease_name })
  );
  pythonProcess.stdin.end();

  let data = "";
  pythonProcess.stdout.on("data", (chunk) => {
    console.log("Chunk from Python:", chunk.toString());
    data += chunk.toString();
  });

  pythonProcess.stdout.on("end", () => {
    try {
      const result = JSON.parse(data);
      if (Array.isArray(result) && result.length > 0) {
        res.json(result);
        console.log(result);
      } else {
        res.status(404).json({
          message: "No treatment found for the specified crop and disease.",
        });
      }
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: "Error parsing the Python script output.", error });
    }
  });
});

//Consultant
app.use("/api/consultant", consultant_route);

//Market
app.use("/api/market", market_routes);

//Dieases History
app.use("/api/dhistory", dieases_history_routes);

//Community
app.use("/api/community", community_route);

//Create payment
app.post("/payment-sheet", async (req, res) => {
  const amount = req.body.amount;
  const customer = await stripe.customers.create();
  const ephemeralKey = await stripe.ephemeralKeys.create(
    { customer: customer.id },
    { apiVersion: "2024-09-30.acacia" }
  );
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount * 100,
    currency: "inr",
    customer: customer.id,
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.json({
    paymentIntent: paymentIntent.client_secret,
    ephemeralKey: ephemeralKey.secret,
    customer: customer.id,
    publishableKey:
      "pk_test_51QBcZQRrq29vGEbGNbdau4pjlkJX8oXAYcLjEFn5CbulDQjevjtneRYDZ3pTOQtrWObzhV6YI6tBYS6iMX18RDc600n8m9i58y",
  });
});

//Crop Recommendation
app.post("/api/recommend_crop", (req, res) => {
  const features = req.body;

  const pythonProcess = spawn("python", ["crop_recommendation.py"]);

  pythonProcess.stdin.write(JSON.stringify(features));
  pythonProcess.stdin.end();

  let data = "";
  pythonProcess.stdout.on("data", (chunk) => {
    data += chunk.toString();
  });

  pythonProcess.stdout.on("end", () => {
    const result = JSON.parse(data);
    console.log(result);
    const newcrops = [];

    try {
      try {
        // Fetch all crops that match the crop names in the array
        result?.crops.forEach((cropName) => {
          if (cropData[cropName]) {
            newcrops.push(cropData[cropName]);
          }
        });

        if (newcrops.length > 0) {
          res.json(newcrops);
        } else {
          res.status(404).json({ message: "No crops found" });
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error fetching crop data", error });
      }
    } catch (error) {
      res.status(500).send("Error parsing prediction result");
    }
  });

  pythonProcess.on("error", (err) => {
    res.status(500).send("Error executing Python script");
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
