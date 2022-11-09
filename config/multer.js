const multer = require("multer");
const path = require("path");
const { brotliCompress } = require("zlib");

// Setting up multer storage
var multerStorage = multer.diskStorage({
  // Setting destination where file is displayed
  destination: function (req, file, callback) {
    callback(null, path.join(__dirname, "..", "uploads"));
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + "_" + file.originalname);
  },
});

// For single file upload
var multerSingleUpload = multer({
  storage: multerStorage,
  fileFilter: (req, file, cb) => {
    var ext = path.extname(file.originalname);
    if (ext !== ".csv") {
      return cb(new Error(`Only CSV File Allowed`));
    }
    cb(null, true);
  },
});

module.exports.uploadedCSV = multerSingleUpload.single("filename");
