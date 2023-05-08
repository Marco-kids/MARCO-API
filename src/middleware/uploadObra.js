const multer = require('multer');

// Set up Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// Function to handle Multer middleware
const uploadFiles = (fields) => {
  const upload = multer({ storage: storage }).fields(fields);

  return (req, res, next) => {
    upload(req, res, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
      }

      // Files uploaded successfully
      next();
    });
  };
};

module.exports = uploadFiles