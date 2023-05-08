const express = require("express");
const obraController = require("../controllers/obra.js");
const router = express.Router();
const uploadFiles = require("../middleware/uploadObra.js");

// GET METHODS
router.get("/all-obras", obraController.getAllObras());
router.get("/get-obra", obraController.getObra());
router.get('/all-models', obraController.getListModels());
router.get('/models/:name', obraController.downloadModels());

// POST METHODS
router.post("/create-obra", uploadFiles([
  { name: 'file', maxCount: 1 },
  { name: 'imagen', maxCount: 1 }
]), obraController.createNewObra());

// DELETE METHODS
router.delete("/delete-obra/:id", obraController.deleteObra());

// PUT METHODS
router.put("/update-obra", obraController.updateObra());

module.exports = router;