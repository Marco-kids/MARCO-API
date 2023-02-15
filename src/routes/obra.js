const express = require("express");
const obraController = require("../controllers/obra.js");
const uploadController = require("../controllers/upload");
const arLocationController = require("../controllers/arLocation");
const upload = require("../middleware/uploadLocation");
const router = express.Router();

// GET METHODS
router.get("/all-obras", obraController.getAllObras());
router.get("/get-obra", obraController.getObra());
router.get('/all-models', obraController.getListModels());
router.get('/models/:name', obraController.downloadModels());
router.get('/locations', arLocationController.getAllARLocations());

// POST METHODS
router.post("/create-obra", obraController.createNewObra());
router.post("/create-location", upload.fields([{name: 'screenshot', maxCount: 1}, {name: 'ARWorldMap', maxCount: 1}]), arLocationController.createNewARLocation());

// DELETE METHODS
router.delete("/delete-obra/:id", obraController.deleteObra());

// PUT METHODS
// router.put("/obra/:id", obraController.updateObra());

module.exports = router;