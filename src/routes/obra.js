const express = require("express");
const obraController = require("../controllers/obra.js");
const uploadController = require("../controllers/upload");
const router = express.Router();

// GET METHODS
router.get("/all-obras", obraController.getAllObras());
router.get("/get-obra", obraController.getObra());
router.get('/all-models', uploadController.getListModels);
router.get('/models/:name', uploadController.downloadModels);

// POST METHODS
router.post("/create-obra", uploadController.createNewObra);

// DELETE METHODS
router.delete("/delete-obra", obraController.deleteObra());

// PUT METHODS
// router.put("/obra/:id", obraController.updateObra());

module.exports = router;