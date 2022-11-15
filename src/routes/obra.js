const express = require("express");
const obraController = require("../controllers/obra.js");
const uploadController = require("../controllers/upload");
const router = express.Router();

// GET METHODS
router.get("/obra", obraController.getAllObras());
router.get("/obra/:id", obraController.getObra());
router.get('/models', uploadController.getListModels);
router.get('/models/:name', uploadController.downloadModels);

// POST METHODS
router.post("/create-obra", uploadController.createNewObra);

// DELETE METHODS
router.delete("/obra/:id", obraController.deleteObra());

// PUT METHODS
// router.put("/obra/:id", obraController.updateObra());

module.exports = router;