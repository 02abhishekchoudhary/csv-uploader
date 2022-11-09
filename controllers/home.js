const csv = require("../models/csv");

// Render in home page of EJS in csvList
module.exports.homePage = function (req, res) {
  csv.find({}, function (err, docs) {
    if (err) {
      console.log("Error!!!", err);
      return;
    }

    return res.render("index", {
      csvlist: docs,
    });
  });
};
