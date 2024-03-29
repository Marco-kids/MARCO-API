const obra = require("../models/obra.js");
require("dotenv").config();
const mongoose = require("mongoose")

let ctr = {};

// GET all obras
ctr.getAllObras = () => async (req, res) => {
    try {
        const obras = obra.find(function(err, docs) {
            if (err) {
                res.status(500).json("Error finding obras")
            }
            res.json(docs)
        })
    } catch {
        res.status(500).json("Error finding obras")
    }
};

// GET a obra
ctr.getObra = () => async (req, res) => {
  obra
    .findById(req.params.id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
};

// DELETE a obra
ctr.deleteObra = () => async (req, res) => {
  const { id } = req.params;
  //console.log(req.body);
  obra.deleteOne({ _id: id }).then(function (data) {
    res.json(data)
  }).catch(function (error) {
    res.json(error)
  });
};

ctr.createNewObra = () => async (req, res) => {

  try {

    const { nombre, autor, descripcion } = req.body;

    const newObra = obra({
      nombre: nombre,
      autor: autor,
      descripcion: descripcion,
      modelo: req.files.file[0].path,
      imagen: req.files.imagen[0].path
    })
    
    const result = await newObra.save()
    res.status(201).json(result)

  } catch(error) {
    return res.status(500).json(error.message);
  }

}

ctr.uploadFiles = () => async (req, res) => {
  try {
    await upload(req, res);

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
ctr.getListModels = () => async (req, res) => {
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
        url: doc.filename,
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
ctr.downloadModels = () => async (req, res) => {
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


// update a obras
ctr.updateObra = () => async (req, res) => {
  try {
    const { id, field, value } = req.body;

    const newEvent =
      obra
        .updateOne({ "_id": id }, { $set: { [field] : value } })
        // .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));

    newEvent
      .save()
      .then(res.json("Success"))

  } catch {
    return res.status(500).json("Server error");
  }

};


/*module.exports = {
    uploadFiles,
    getListModels,
    downloadModels,
    createNewObra
};*/

module.exports = ctr;