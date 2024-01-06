require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMENI_API);

const model = genAI.getGenerativeModel({ model: "gemini-pro" });

mongoose.connect(process.env.MONGODB_URI);

const app = express();

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get("/prompt", async (req, res) => {
  const prompt = "Give me the SQL command to get all the rows listed";

  const result = await model.generateContent(prompt);
  const response = await result.response;
  res.json(response);
});

app.listen(4000, () => {
  console.log("Listening on PORT 4000");
});
