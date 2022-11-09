const mongoose = require("mongoose");

// Creating Schema
const csvSchema = new mongoose.Schema(
  {
    file_name: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const FileCsv = mongoose.model("CSV-Upload", csvSchema);
module.exports = FileCsv;
