require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const cors = require("cors");

const genAI = new GoogleGenerativeAI(process.env.GEMENI_API);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const Database = require("./models/Database");

const { sequelizeConnect } = require("./utils/sequelizeConnect");

mongoose.connect(process.env.MONGODB_URI);

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get("/prompt", async (req, res) => {});

app.get("/database", async (req, res) => {
  try {
    const databases = await Database.find();

    res.json({
      status: "successful",
      databases,
    });
  } catch (error) {
    res.json({
      status: "error",
      error,
    });
  }
});

app.post("/save-database", async (req, res) => {
  try {
    const alreadyExisting = await Database.find({
      hostname: req.body.hostname,
    });

    if (alreadyExisting.length) {
      throw new Error(
        "The database with the following hostname already exists"
      );
    }

    const database = await Database.create({
      name: req.body.name,
      hostname: req.body.hostname,
      role: req.body.role,
      password: req.body.password,
      dbType: req.body.dbType,
    });

    res.json({
      status: "successful",
      id: database._id,
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: "error",
      error,
    });
  }
});

app.post("/ask-query", async (req, res) => {
  try {
    const database = await Database.findById(req.body.databaseId);

    if (!database) {
      throw new Error("No database found");
    }

    const sequelize = await sequelizeConnect(database.hostname);

    const result = await model.generateContent(req.body.query);
    const response = await result.response;
    const query = response.text();

    const [databaseRows, metadata] = await sequelize.query(
      "SELECT * FROM playing_with_neon;"
    );

    await sequelize.close();
    console.log("The connection has been destroyed");

    res.json({
      status: "successful",
      result: databaseRows,
    });
  } catch (error) {
    res.json({
      status: "error",
      error,
    });
  }
});

app.listen(5000, () => {
  console.log("Listening on PORT 5000");
});
