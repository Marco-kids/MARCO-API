const express = require("express");
const obraController = require("../controllers/obra.js");
const homeController = require("../controllers/home");
const uploadController = require("../controllers/upload");
const router = express.Router();

// GET METHODS
router.get("/obra", obraController.getAllObras());
router.get("/obra/:id", obraController.getObra());
router.get("/home", homeController.getHome); // Upload modelos temporal

// GET TEMPORALES
router.get('/models', uploadController.getListModels);
router.get('/models/:name', uploadController.downloadModels);

// POST METHODS
router.post("/create-obra",obraController.createNewObra());
router.post("/upload", uploadController.uploadFiles);

// DELETE METHODS
router.delete("/obra/:id",obraController.deleteObra());

// PUT METHODS
router.put("/obra/:id", obraController.updateObra());

module.exports = router;