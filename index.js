const express = require("express");
const mongoose = require("mongoose");
const app = express();

// Connecting with mongoose
mongoose
  .connect("mongodb://localhost:27017/csv-upload", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connection Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

// Use uploads path for upload
app.use("/uploads", express.static(__dirname + "/uploads"));

// Setting up view engine 'EJS'
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.static("./assets"));

// Creatiing server
app.listen(5000, () => {
  console.log("Server started on port 4000");
});

// Setting up routes
app.use("/", require("./routes"));
app.use(express.json());
