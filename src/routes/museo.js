const express = require("express");
const museoController = require("../controllers/museo");
const handleImageUpload = require("../middleware/uploadMuseo");
const router = express.Router();

// GET METHODS
router.get('/museo', museoController.listMuseo());
router.get('/museo/active', museoController.getActiveMuseo());

// POST METHODS
router.post("/museo", handleImageUpload, museoController.createNewMuseo());

// PUT METHODS
router.put("/museo/activate/:id", museoController.setActiveMuseo());
router.put("/museo/obras/:id", museoController.updateObras);
router.put("/museo/locations/:id", museoController.updateLocations);

// DELETE METHODS
router.delete("/museo/:id", museoController.deleteMuseo);

module.exports = router;