const express = require("express");
const obraController = require("../controllers/obra.js");
const uploadController = require("../controllers/upload");
const upload = require("../middleware/uploadLocation");
const router = express.Router();

// GET METHODS
router.get("/all-obras", obraController.getAllObras());
router.get("/get-obra", obraController.getObra());
router.get('/all-models', obraController.getListModels());
router.get('/models/:name', obraController.downloadModels());

// POST METHODS
router.post("/create-obra", obraController.createNewObra());

// DELETE METHODS
router.delete("/delete-obra/:id", obraController.deleteObra());

// PUT METHODS
router.put("/update-obra", obraController.updateObra());

module.exports = router;