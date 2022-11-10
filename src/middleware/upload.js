const util = require("util");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");

var storage = new GridFsStorage({
  url: process.env.DB_URL + process.env.DATABASE_NAME,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const match = ["model/vnd.usdz+zip"];

    if (match.indexOf(file.mimetype) === -1) {
      const filename = `${Date.now()}-DEBUG:NOT-A-MODEL-${file.originalname}`;
      return filename;
    }

    return {
      bucketName: process.env.MODELS_BUCKET,
      filename: `${Date.now()}-MARCO-KIDS-${file.originalname}`
    };
  }
});

var uploadFiles = multer({ storage: storage }).array("file", 10);
var uploadFilesMiddleware = util.promisify(uploadFiles);
module.exports = uploadFilesMiddleware;