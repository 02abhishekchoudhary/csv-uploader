const csvparser = require("csv-parser");
const csvSchema = require("../models/csv");
const csvmulter = require("../config/multer");
const fs = require("fs");
const path = require("path");

// API -> Creating file and storing in DB
module.exports.create = function (req, res) {
  try {
    csvmulter.uploadedCSV(req, res, function (err) {
      if (err) {
        console.log("Error In MULTER", err);
        return res.send(
          `<h3>Not a csv File! please go back and  select a csv file then upload</h3>`
        );
      }
      if (req.file) {
        // Creating and storing the file in DB
        csvSchema.create({ file_name: req.file.filename });
      }
      return res.redirect("back");
    });
  } catch (err) {
    console.log("ERROR", err);
    return res.redirect("back");
  }
};

// API -> reading CSV file
module.exports.readCsv = function (req, res) {
  // Creating an array for storing the data
  const results = [];

  // Finding the data in csvSchema(DB)
  csvSchema.findById(req.params.id, function (err, docs) {
    if (err) {
      console.log("Error", err);
      return;
    }

    // here we are joining the path and store in joinedPath. We are using path.join for resolving absolute path means return absolute path
    const joinedPath = path.join(__dirname, "..", "/uploads/" + docs.file_name);

    // here we are reading the file and reading the Stream the use pipe csvparser for passing the data as csv and getting the string object  and then  push into the array
    fs.createReadStream(joinedPath)
      .pipe(csvparser())
      .on("data", (data) => results.push(data))
      .on("end", () => {
        // getting the result object
        res.render("table", {
          // set the 1st row in header
          headers: Object.keys(results[0]),
          // remaining data set in data
          data: results,
        });
      });
  });
};

// API -> Deleting CSV File
module.exports.delete = async function (req, res) {
  const file = await csvSchema.findByIdAndDelete(req.params.id);
  if (file) {
    return res.redirect("back");
  } else {
    console.log("Error in deleting CSV file from DB");
  }
};
