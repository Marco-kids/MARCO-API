const express = require("express");
const museoController = require("../controllers/museo");
const router = express.Router();

// GET METHODS
router.get('/museo', museoController.listMuseo());
router.get('/museo/active', museoController.getActiveMuseo());

// POST METHODS
router.post("/museo", museoController.createNewMuseo());

// PUT METHODS
router.put("/museo/activate/:id", museoController.setActiveMuseo());

// DELETE METHODS
// router.delete("/delete-locations", );

module.exports = router;