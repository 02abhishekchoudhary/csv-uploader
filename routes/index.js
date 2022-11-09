const express = require("express");
const router = express.Router();
const home = require("../controllers/home");
const csv = require("../controllers/csv");

// For home page
router.get("/", home.homePage);

// For reading CSV
router.get("/:id/read", csv.readCsv);

// For creating CSV
router.post("/upload/csv", csv.create);

// For deleting CSV file
router.get("/:id/delete", csv.delete);

module.exports = router;
