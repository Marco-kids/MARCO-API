const upload = require("../middleware/upload");
const obra = require("../models/obra.js");
const mongoose = require("mongoose")
const baseUrl = process.env.IP_PC + "/api/models/";

const createNewObra = async (req, res) => {

  const successUpload = await upload(req, res);
  console.log(req.file);
  try {

    const {nombre, autor, descripcion, longitud, latitud} = req.body;
    const modelo = req.fileName;

    if(!nombre || !autor || !descripcion || !modelo || !longitud || ! latitud){
      return res.status(402).json("Empty fields");
    }

    const newEvent = obra({
      nombre: nombre,
      autor: autor,
      descripcion: descripcion,
      modelo: modelo,
      longitud: longitud,
      latitud: latitud
    })
    newEvent
      .save()
      .then(res.json("success"))

  } catch {
    return res.status(500).json("Server error");
  }
  
}

const uploadFiles = async (req, res) => {
  try {
    await upload(req, res);
    console.log(req.files);

    if (req.files.length <= 0) {
      return res
        .status(400)
        .send({ message: "You must select at least 1 file." });
    }

    return res.status(200).send({
      message: "Files have been uploaded.",
    });

  } catch (error) {
    console.log(error);

    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      return res.status(400).send({
        message: "Too many files to upload.",
      });
    }
    return res.status(500).send({
      message: `Error when trying upload many files: ${error}`,
    });

  }
};

// Regresa lista de modelos 3D en USDZ
const getListModels = async (req, res) => {
  try {

    const images = mongoose.connection.db.collection(process.env.MODELS_BUCKET + ".files");
    const cursor = images.find();

    if (await images.countDocuments() === 0) {
      return res.status(500).send({
        message: "No files found!",
      });
    }

    let fileInfos = [];
    await cursor.forEach((doc) => {
      fileInfos.push({
        name: doc.filename,
        url: baseUrl + doc.filename,
      });
    });

    return res.status(200).send(fileInfos);
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};

// Descargar modelos
const downloadModels = async (req, res) => {
  try {
    const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
      bucketName: process.env.MODELS_BUCKET,
    });

    let downloadStream = bucket.openDownloadStreamByName(req.params.name);

    downloadStream.on("data", function (data) {
      return res.status(200).write(data);
    });

    downloadStream.on("error", function (err) {
      return res.status(404).send({ message: "Cannot download the model!" });
    });

    downloadStream.on("end", () => {
      return res.end();
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};

module.exports = {
  uploadFiles,
  getListModels,
  downloadModels,
  createNewObra
};