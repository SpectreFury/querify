require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Database = require("./models/Database");

const { sequelizeConnect } = require("./utils/sequelizeConnect");
const { generateQuery } = require("./utils/generateQuery");
const { testConnection } = require("./utils/testConnection");

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
    const { name, hostname, role, password, dbType, databaseName } = req.body;

    const alreadyExisting = await Database.find({
      hostname: req.body.hostname,
    });

    if (alreadyExisting.length) {
      throw new Error(
        "The database with the following hostname already exists"
      );
    }

    const isValid = await testConnection(
      hostname,
      role,
      password,
      dbType,
      databaseName
    );

    if (!isValid) {
      throw new Error("The connection was not valid");
    }

    const database = await Database.create({
      name,
      hostname,
      role,
      password,
      databaseName,
      dbType,
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

    const sequelize = await sequelizeConnect(
      database.hostname,
      database.role,
      database.password,
      database.dbType,
      database.databaseName
    );
    const query = await generateQuery(req.body.query);

    const [databaseRows, metadata] = await sequelize.query(query);

    await sequelize.close();
    console.log("The connection has been destroyed");

    res.json({
      status: "successful",
      queryResult: databaseRows,
      metadata,
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
