const express = require("express");
const arLocationController = require("../controllers/location");
const upload = require("../middleware/uploadLocation");
const router = express.Router();

// GET METHODS
router.get('/locations', arLocationController.getAllARLocations());

// POST METHODS
router.post("/create-location", upload.fields([{name: 'screenshot', maxCount: 1}, {name: 'ARWorldMap', maxCount: 1}]), arLocationController.createNewARLocation());

// DELETE METHODS
router.delete("/delete-locations", arLocationController.deleteAllLocations());
router.delete("/locations/:id", arLocationController.deleteOneLocations)

module.exports = router;