const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();

// Set storage engine
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function(req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Initialize upload
const upload = multer({
  storage: storage,
  fileFilter: function(req, file, callback) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|JPG)$/)) {
      return callback(new Error('Only image files are allowed!'));
    }
    callback(null, true);
  }
}).single('imagen');

// Define middleware function to handle image upload
function handleImageUpload(req, res, next) {
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
      res.status(400).json({ error: err.message });
    } else {
      req.image = req.file;
      next();
    }
  });
}

module.exports = handleImageUpload