const mongoose = require("mongoose");

const DatabaseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  hostname: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  dbType: {
    type: String,
    enum: ["postgres", "mysql", "mongodb"],
    default: "postgres",
  },
});

const Database = mongoose.model("Database", DatabaseSchema);

module.exports = Database;
